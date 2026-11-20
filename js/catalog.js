const params = new URLSearchParams(location.search);
const category = Object.hasOwn(categories, params.get("category")) ? params.get("category") : "all";
const grid = document.querySelector(".products-grid");
const heading = document.querySelector(".catalog-products__title");
const count = document.querySelector("#catalog-count");
const form = document.querySelector(".catalog-filters__form");
if (heading) heading.textContent = categories[category].toLocaleUpperCase("ru");
function renderProducts() {
  const from = Math.max(0, Number(document.querySelector("#price-from")?.value || 0));
  const toRaw = document.querySelector("#price-to")?.value;
  const to = toRaw === "" ? Infinity : Number(toRaw);
  const tags = [...document.querySelectorAll('input[name="tag"]:checked')].map(el => el.value);
  const filtered = products.filter(p => (category === "all" || p.category === category) && p.price >= from && p.price <= to && (!tags.length || tags.every(tag => tag === "popular" ? p.popular : tag === "new" ? p.isNew : true)));
  count.textContent = `Найдено: ${filtered.length}`;
  if (!filtered.length) { grid.innerHTML = '<p class="empty-state">По заданным параметрам товары не найдены. Измените фильтры.</p>'; return; }
  grid.innerHTML = filtered.map((p, i) => `<article class="product-card">
    ${p.popular ? '<span class="product-card__badge">ПОПУЛЯРНОЕ</span>' : p.isNew ? '<span class="product-card__badge">НОВИНКА</span>' : ''}
    <a class="product-card__image-wrap" href="product.html?name=${encodeURIComponent(p.name)}"><img class="product-card__img" src="${p.image}" alt="${p.name}" loading="lazy"></a>
    <p class="product-card__code">ITEM / ${String(i+1).padStart(3,"0")}</p><h3 class="product-card__title"><a href="product.html?name=${encodeURIComponent(p.name)}">${p.name}</a></h3>
    <p class="product-card__description">${p.description}</p><div class="product-card__bottom"><p class="product-card__price">${p.price.toLocaleString("ru-RU")} ₽</p>
    <button class="button button--order product-card__button" type="button" data-product="${p.name}" data-price="${p.price.toLocaleString("ru-RU")} ₽" data-image="${p.image}">ЗАКАЗАТЬ ↗</button></div></article>`).join("");
}
form?.addEventListener("submit", e => { e.preventDefault(); renderProducts(); });
form?.addEventListener("reset", () => setTimeout(renderProducts));
renderProducts();