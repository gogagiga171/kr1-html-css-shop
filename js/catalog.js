
const products = [
  { name: "Смартфон", category: "electronics", description: "Современный смартфон для повседневных задач.", price: 25000, image: "product-1.svg", popular: true, isNew: true },
  { name: "Наушники", category: "electronics", description: "Беспроводные наушники с чистым звуком.", price: 4500, image: "product-2.svg", popular: true },
  { name: "Ноутбук", category: "electronics", description: "Ноутбук для работы и учёбы.", price: 65000, image: "product-3.svg", isNew: true },

  { name: "Футболка", category: "clothing", description: "Удобная хлопковая футболка.", price: 1200, image: "product-1.svg", popular: true },
  { name: "Куртка", category: "clothing", description: "Практичная куртка на каждый день.", price: 5500, image: "product-2.svg", isNew: true },
  { name: "Кроссовки", category: "clothing", description: "Комфортная обувь для прогулок.", price: 4200, image: "product-3.svg" },

  { name: "Кольцо", category: "jewelry", description: "Элегантное украшение для любого образа.", price: 1800, image: "product-1.svg", popular: true },
  { name: "Браслет", category: "jewelry", description: "Стильный браслет на каждый день.", price: 950, image: "product-2.svg" },
  { name: "Серьги", category: "jewelry", description: "Лаконичные серьги для любого случая.", price: 1400, image: "product-3.svg", isNew: true },

  { name: "Настольная лампа", category: "home", description: "Лампа для уютного рабочего места.", price: 2100, image: "product-1.svg", popular: true },
  { name: "Подушка", category: "home", description: "Мягкая декоративная подушка.", price: 800, image: "product-2.svg" },
  { name: "Чайник", category: "home", description: "Электрический чайник для кухни.", price: 1900, image: "product-3.svg", isNew: true },

  { name: "Крем для лица", category: "beauty", description: "Уход за кожей на каждый день.", price: 900, image: "product-1.svg" },
  { name: "Шампунь", category: "beauty", description: "Средство для ухода за волосами.", price: 550, image: "product-2.svg" },

  { name: "Спортивная бутылка", category: "sport", description: "Бутылка для тренировок и прогулок.", price: 700, image: "product-1.svg" },
  { name: "Фитнес-коврик", category: "sport", description: "Коврик для домашних тренировок.", price: 1600, image: "product-2.svg" },

  { name: "Рюкзак", category: "accessories", description: "Практичный рюкзак для города.", price: 2800, image: "product-1.svg", popular: true },
  { name: "Наручные часы", category: "accessories", description: "Стильные часы на каждый день.", price: 3500, image: "product-2.svg" }
];

const categories = {
  all: "Все товары",
  electronics: "Техника",
  clothing: "Одежда",
  jewelry: "Украшения",
  home: "Товары для дома",
  beauty: "Красота и уход",
  sport: "Спорт и отдых",
  accessories: "Аксессуары"
};

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
        ${badges}

        <img
          class="product-card__img"
          src="images/${product.image}"
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

        <a
          class="button button--primary product-card__button"
          href="index.html#popular"
        >
          Подробнее
        </a>
      </article>
    `;
  }).join("");
}

renderProducts();
