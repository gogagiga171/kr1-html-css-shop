const root = document.querySelector("#popular-products");
const formatPrice = value => `${value.toLocaleString("ru-RU")} ₽`;

if (root && Array.isArray(products)) {
    const popularProducts = products
        .filter(product => product.popular)
        .slice(0, 6);

    root.innerHTML = popularProducts.map((product, index) => `
        <article class="product-card ${index === 0 ? "product-card--featured" : ""}">
            <span class="product-card__badge">ПОПУЛЯРНОЕ</span>
            <a
                class="product-card__image-wrap"
                href="product.html?name=${encodeURIComponent(product.name)}"
                aria-label="Подробнее: ${product.name}"
            >
                <img
                    class="product-card__img"
                    src="${product.image}"
                    alt="${product.alt || product.name}"
                    loading="lazy"
                >
            </a>
            <p class="product-card__code">
                ITEM / ${String(index + 1).padStart(3, "0")} — TOP PICK
            </p>
            <h3 class="product-card__title">
                <a href="product.html?name=${encodeURIComponent(product.name)}">
                    ${product.name}
                </a>
            </h3>
            <p class="product-card__description">${product.description}</p>
            <div class="product-card__bottom">
                <p class="product-card__price">${formatPrice(product.price)}</p>
                <button
                    class="button button--order product-card__button"
                    type="button"
                    data-product="${product.name}"
                    data-price="${formatPrice(product.price)}"
                    data-image="${product.image}"
                >
                    ЗАКАЗАТЬ <span>↗</span>
                </button>
            </div>
        </article>
    `).join("");
}
