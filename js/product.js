const params = new URLSearchParams(window.location.search);
const productName = params.get("name");

const product = products.find(item => item.name === productName);

const detail = document.querySelector("#product-detail");
const breadcrumb = document.querySelector("#product-breadcrumb");
const reviewsList = document.querySelector("#reviews-list");
const reviewsSummary = document.querySelector("#reviews-summary");
const reviewForm = document.querySelector("#review-form");
const reviewMessage = document.querySelector("#review-message");

if (!product) {
  detail.innerHTML = `
    <h1>Товар не найден</h1>
    <p>Возможно, товар был удалён или ссылка неверна.</p>
    <a class="button button--primary" href="catalog.html">
      Вернуться в каталог
    </a>
  `;

  document.querySelector("#reviews").hidden = true;
} else {
  document.title = `${product.name} — ShopProject`;
  breadcrumb.textContent = product.name;

  detail.innerHTML = `
    <div class="product-detail__layout">
      <div class="product-detail__image-wrapper">
        <img
          class="product-detail__image"
          src="images/${product.image}"
          alt="${product.name}"
          width="400"
          height="300"
        >
      </div>

      <div class="product-detail__info">
        <h1>${product.name}</h1>

        <p class="product-detail__description">
          ${product.description}
        </p>

        <p class="product-detail__category">
          Категория: ${categories[product.category] || "Товары"}
        </p>

        <p class="product-card__price">
          Цена: ${product.price.toLocaleString("ru-RU")} руб.
        </p>
        
        <button
          class="button button--primary product-detail__order-button"
          id="open-order-dialog"
          type="button"
        >
          Оформить заявку
        </button>

        ${product.popular
          ? '<span class="product-card__badge">Хит</span>'
          : ""}

        ${product.isNew
          ? '<span class="product-card__badge">Новинка</span>'
          : ""}

        <a class="button button--secondary" href="catalog.html">
          Вернуться в каталог
        </a>
      </div>
    </div>
  `;

  const storageKey =
    `shopproject-reviews-${encodeURIComponent(product.name)}`;

  function getReviews() {
    try {
      const saved = JSON.parse(localStorage.getItem(storageKey) || "[]");
      return Array.isArray(saved) ? saved : [];
    } catch {
      return [];
    }
  }

  function renderReviews() {
    const reviews = getReviews();

    if (reviews.length === 0) {
      reviewsSummary.textContent = "Пока нет отзывов. Будьте первым!";
      reviewsList.replaceChildren();
      return;
    }

    const average =
      reviews.reduce((sum, review) => sum + review.rating, 0) /
      reviews.length;

    reviewsSummary.textContent =
      `Средняя оценка: ${average.toFixed(1)} из 5 · ` +
      `Отзывов: ${reviews.length}`;

    reviewsList.replaceChildren();

    reviews.slice().reverse().forEach(review => {
      const article = document.createElement("article");
      article.className = "review-card";

      const title = document.createElement("h4");
      title.className = "review-card__author";
      title.textContent = review.author;

      const rating = document.createElement("p");
      rating.className = "review-card__rating";
      rating.textContent = `Оценка: ${review.rating} из 5`;

      const text = document.createElement("p");
      text.className = "review-card__text";
      text.textContent = review.text;

      const date = document.createElement("time");
      date.className = "review-card__date";
      date.dateTime = review.date;
      date.textContent = new Date(review.date).toLocaleDateString("ru-RU");

      article.append(title, rating, text, date);
      reviewsList.append(article);
    });
  }

  reviewForm.addEventListener("submit", event => {
    event.preventDefault();

    const formData = new FormData(reviewForm);
    const author = String(formData.get("author") || "").trim();
    const text = String(formData.get("text") || "").trim();
    const rating = Number(formData.get("rating"));

    if (
      !author ||
      !text ||
      author.length > 60 ||
      text.length > 1000 ||
      !Number.isInteger(rating) ||
      rating < 1 ||
      rating > 5
    ) {
      reviewMessage.textContent = "Проверьте заполнение формы.";
      return;
    }

    const reviews = getReviews();

    reviews.push({
      author,
      text,
      rating,
      date: new Date().toISOString()
    });

    try {
      localStorage.setItem(storageKey, JSON.stringify(reviews));
    } catch {
      reviewMessage.textContent =
        "Не удалось сохранить отзыв. Проверьте настройки хранилища браузера.";
      return;
    }

    reviewForm.reset();
    reviewMessage.textContent = "Отзыв добавлен.";
    renderReviews();
  });

  renderReviews();
}