const params = new URLSearchParams(location.search);
const requestedCategory = params.get("category");
const category = Object.hasOwn(categories, requestedCategory)
    ? requestedCategory
    : "all";

const grid = document.querySelector(".products-grid");
const heading = document.querySelector(".catalog-products__title");
const count = document.querySelector("#catalog-count");
const form = document.querySelector(".catalog-filters__form");

if (heading) {
    heading.textContent = categories[category].toLocaleUpperCase("ru");
}

function renderProducts() {
    const from = Math.max(
        0,
        Number(document.querySelector("#price-from")?.value || 0)
    );
    const toRaw = document.querySelector("#price-to")?.value;
    const to = toRaw === "" ? Infinity : Number(toRaw);
    const selectedTags = [
        ...document.querySelectorAll('input[name="tag"]:checked')
    ].map(input => input.value);

    const filteredProducts = products.filter(product => {
        const matchesCategory = category === "all" || product.category === category;
        const matchesPrice = product.price >= from && product.price <= to;
        const matchesTags = !selectedTags.length || selectedTags.every(tag => {
            if (tag === "popular") return product.popular;
            if (tag === "new") return product.isNew;
            return true;
        });

        return matchesCategory && matchesPrice && matchesTags;
    });

    count.textContent = `Найдено: ${filteredProducts.length}`;

    if (!filteredProducts.length) {
        grid.innerHTML = `
            <p class="empty-state">
                По заданным параметрам товары не найдены. Измените фильтры.
            </p>
        `;
        return;
    }

    grid.innerHTML = filteredProducts.map((product, index) => `
        <article class="product-card">
            ${product.popular
                ? '<span class="product-card__badge">ПОПУЛЯРНОЕ</span>'
                : product.isNew
                    ? '<span class="product-card__badge">НОВИНКА</span>'
                    : ""}
            <a
                class="product-card__image-wrap"
                href="product.html?name=${encodeURIComponent(product.name)}"
            >
                <img
                    class="product-card__img"
                    src="${product.image}"
                    alt="${product.alt}"
                    loading="lazy"
                >
            </a>
            <p class="product-card__code">
                ITEM / ${String(index + 1).padStart(3, "0")}
            </p>
            <h3 class="product-card__title">
                <a href="product.html?name=${encodeURIComponent(product.name)}">
                    ${product.name}
                </a>
            </h3>
            <p class="product-card__description">${product.description}</p>
            <div class="product-card__bottom">
                <p class="product-card__price">
                    ${product.price.toLocaleString("ru-RU")} ₽
                </p>
                <button
                    class="button button--order product-card__button"
                    type="button"
                    data-product="${product.name}"
                    data-price="${product.price.toLocaleString("ru-RU")} ₽"
                    data-image="${product.image}"
                >
                    ЗАКАЗАТЬ ↗
                </button>
            </div>
        </article>
    `).join("");
}

form?.addEventListener("submit", event => {
    event.preventDefault();
    renderProducts();
});

form?.addEventListener("reset", () => {
    setTimeout(renderProducts);
});

renderProducts();
