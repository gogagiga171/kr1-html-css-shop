
const params = new URLSearchParams(window.location.search);
const category = categories[params.get("category")]
  ? params.get("category")
  : "all";

const grid = document.querySelector(".products-grid");
const heading = document.querySelector(".catalog-products__title");
const pageHeading = document.querySelector(".section h1");
const description = document.querySelector(".section p");
const form = document.querySelector(".catalog-filters__form");

if (heading) heading.textContent = categories[category];
if (pageHeading) pageHeading.textContent = categories[category];

if (description) {
  description.textContent =
    category === "all"
      ? "Выберите категорию и найдите подходящие товары."
      : `Категория «${categories[category]}»: товары, доступные в нашем каталоге.`;
}

if (form) {
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    renderProducts();
  });
}

function renderProducts() {
  if (!grid) return;

  const priceFrom = Number(
    document.querySelector("#price-from")?.value || 0
  );

  const priceToInput = document.querySelector("#price-to")?.value;
  const priceTo =
    priceToInput === "" || priceToInput == null
      ? Infinity
      : Number(priceToInput);

  const selectedTags = [
    ...document.querySelectorAll('input[name="tag"]:checked')
  ].map(input => input.value);

  const filtered = products.filter(product => {
    const matchesCategory =
      category === "all" || product.category === category;

    const matchesPrice =
      product.price >= priceFrom && product.price <= priceTo;

    const matchesTags =
      selectedTags.length === 0 ||
      selectedTags.every(tag =>
        tag === "popular" ? product.popular :
        tag === "new" ? product.isNew :
        true
      );

    return matchesCategory && matchesPrice && matchesTags;
  });

  if (filtered.length === 0) {
    grid.innerHTML =
      "<p>В этой категории нет товаров по заданным фильтрам.</p>";
    return;
  }

  grid.innerHTML = filtered.map(product => {
    // Выбираем модификатор карточки
    let modifier = "product-card--muted";

    if (product.isNew) {
      modifier = "product-card--new";
    } else if (product.popular) {
      modifier = "product-card--recommended";
    } else if (product.price <= 1000) {
      modifier = "product-card--compact";
    }

    // Пример скидки для товаров от 4000 рублей
    const hasSale = product.price >= 4000;
    const oldPrice = hasSale
      ? Math.round(product.price * 1.2)
      : null;

    if (hasSale) {
      modifier = "product-card--sale";
    }

    const badges = [
      product.popular
        ? '<span class="product-card__badge">Хит</span>'
        : "",
      product.isNew
        ? '<span class="product-card__badge">Новинка</span>'
        : "",
      hasSale
        ? '<span class="product-card__badge">Скидка</span>'
        : ""
    ].join("");

    return `
      <article class="product-card ${modifier}">
        <a
          class="product-card__link"
          href="product.html?name=${encodeURIComponent(product.name)}"
          aria-label="Подробнее о товаре: ${product.name}"
        >
          ${badges}
    
          <img
            class="product-card__img"
            src="${product.image}"
            alt="${product.name}"
            width="400"
            height="300"
            loading="lazy"
          >
    
          <h3 class="product-card__title">${product.name}</h3>
    
          <p class="product-card__description">
            ${product.description}
          </p>
    
          ${hasSale ? `
            <p class="product-card__old-price">
              ${oldPrice.toLocaleString("ru-RU")} руб.
            </p>
          ` : ""}
    
          <p class="product-card__price">
            Цена: ${product.price.toLocaleString("ru-RU")} руб.
          </p>
    
          <span class="button button--primary product-card__button">
            Подробнее
          </span>
        </a>
      </article>
    `;
  }).join("");
}

renderProducts();
