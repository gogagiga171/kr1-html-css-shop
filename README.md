# INSTRUMENTAL — магазин инструментов

## Запуск

Откройте `index.html` в браузере или запустите локальный сервер из корня проекта:

```bash
python -m http.server 8000
```

## Страницы

- `index.html` — главная страница и популярные товары.
- `catalog.html` — каталог с фильтрами.
- `product.html?name=...` — карточка товара и отзывы.
- `about.html` — информация о магазине, карта и раздел FAQ.
- `contacts.html` — контактная информация и популярные товары.

## Структура

- `css/style.css` — общие стили и адаптивная тема.
- `assets/` — SVG-иконки контактов.
- `js/products.js` — список товаров и категорий.
- `js/home.js` — популярные товары.
- `js/catalog.js` — фильтрация и вывод каталога.
- `js/product.js` — карточка товара и отзывы.
- `js/order-form.js` — форма заявки.
- `js/faq.js` — поиск, фильтрация и раскрытие FAQ на странице «О нас».
- `js/to-top.js` — кнопка прокрутки наверх.
- `js/topbar.js` — движение полосок верхней ленты по направлению прокрутки.

Отзывы сохраняются в `localStorage` браузера. Для реального приёма и обработки заявок необходимо подключить серверную часть.


## SEO update
- Titles and descriptions are made unique for key pages.
- Open Graph and Twitter card metadata added.
- LocalBusiness/HardwareStore structured data added on home and contacts.
- Product page metadata and Product/Offer JSON-LD are set dynamically based on selected product.
- Favorites page is marked noindex; robots.txt excludes it.
- IMPORTANT: Replace YOUR-DOMAIN-HERE in sitemap.xml with the final HTTPS domain before publishing. Add canonical URLs and a Sitemap directive to robots.txt after domain is confirmed.
