const params = new URLSearchParams(location.search);
const product = products.find(item => item.name === params.get("name"));
const detail = document.querySelector("#product-detail");
const breadcrumb = document.querySelector("#product-breadcrumb");
const reviewsSection = document.querySelector("#reviews");
if (!product) {
  detail.innerHTML = '<div class="empty-state"><h1>ТОВАР НЕ НАЙДЕН</h1><p>Проверьте ссылку или вернитесь в каталог.</p><a class="button button--primary" href="catalog.html">В КАТАЛОГ</a></div>';
  reviewsSection.hidden = true;
} else {
  document.title = `${product.name} — Instrumental`;
  breadcrumb.textContent = product.name;
  detail.innerHTML = `<div class="product-detail__layout"><div class="product-detail__image-wrapper"><img class="product-detail__image" src="${product.image}" alt="${product.name}"></div><div class="product-detail__info"><p class="eyebrow">INSTRUMENTAL / ITEM DETAILS</p><h1>${product.name}</h1><p class="product-detail__description">${product.description}</p><p class="product-detail__category">Категория: ${categories[product.category]}</p><p class="product-card__price">${product.price.toLocaleString("ru-RU")} ₽</p><button class="button button--primary product-detail__order-button product-card__button" type="button" data-product="${product.name}" data-price="${product.price.toLocaleString("ru-RU")} ₽" data-image="${product.image}">ОФОРМИТЬ ЗАЯВКУ ↗</button><a class="text-link" href="catalog.html">← ВЕРНУТЬСЯ В КАТАЛОГ</a></div></div>`;
  const key = `instrumental-reviews-${encodeURIComponent(product.name)}`;
  const form = document.querySelector("#review-form"), list = document.querySelector("#reviews-list"), summary = document.querySelector("#reviews-summary"), message = document.querySelector("#review-message");
  const getReviews = () => { try { const value = JSON.parse(localStorage.getItem(key) || "[]"); return Array.isArray(value) ? value : []; } catch { return []; } };
  function renderReviews() {
    const reviews = getReviews();
    summary.textContent = reviews.length ? `Средняя оценка: ${(reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1)} из 5 · Отзывов: ${reviews.length}` : "Пока нет отзывов. Будьте первым!";
    list.replaceChildren();
    reviews.slice().reverse().forEach(r => { const card = document.createElement("article"); card.className = "review-card"; const title = document.createElement("h4"); title.textContent = r.author; const rating = document.createElement("p"); rating.className = "review-card__rating"; rating.textContent = `Оценка: ${r.rating} из 5`; const body = document.createElement("p"); body.textContent = r.text; const date = document.createElement("time"); date.textContent = new Date(r.date).toLocaleDateString("ru-RU"); card.append(title, rating, body, date); list.append(card); });
  }
  form.addEventListener("submit", e => { e.preventDefault(); const data = new FormData(form); const author = String(data.get("author") || "").trim(), text = String(data.get("text") || "").trim(), rating = Number(data.get("rating")); if (!author || !text || !Number.isInteger(rating) || rating < 1 || rating > 5) { message.textContent = "Проверьте заполнение формы."; return; } const reviews = getReviews(); reviews.push({author, text, rating, date: new Date().toISOString()}); try { localStorage.setItem(key, JSON.stringify(reviews)); form.reset(); message.textContent = "Отзыв сохранён в этом браузере."; renderReviews(); } catch { message.textContent = "Не удалось сохранить отзыв в браузере."; } });
  renderReviews();
}