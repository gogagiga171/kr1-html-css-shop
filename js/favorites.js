(() => {
    const STORAGE_KEY = "instrumental-favorites";
    const productsList = typeof products !== "undefined" && Array.isArray(products) ? products : [];

    function readFavorites() {
        try {
            const value = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
            return Array.isArray(value) ? value.filter(item => typeof item === "string") : [];
        } catch {
            return [];
        }
    }

    function writeFavorites(items) {
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify([...new Set(items)]));
        } catch {
            // Браузер может запретить localStorage; интерфейс продолжит работать до перезагрузки.
        }
        updateAll();
    }

    function isFavorite(name) {
        return readFavorites().includes(name);
    }

    function escapeHtml(value) {
        return String(value ?? "").replace(/[&<>"']/g, char => ({
            "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"
        })[char]);
    }

    function priceText(value) {
        return `${Number(value).toLocaleString("ru-RU")} ₽`;
    }

    function makeFavoriteButton(name, extraClass = "") {
        const button = document.createElement("button");
        button.type = "button";
        button.className = `favorite-toggle ${extraClass}`.trim();
        button.dataset.favoriteToggle = "";
        button.dataset.productName = name;
        button.innerHTML = '<span aria-hidden="true">♡</span>';
        button.setAttribute("aria-label", `Добавить «${name}» в избранное`);
        return button;
    }

    function decorateCards(scope = document) {
        const cards = [];
        if (scope.nodeType === Node.ELEMENT_NODE && scope.matches(".product-card")) cards.push(scope);
        cards.push(...scope.querySelectorAll(".product-card"));
        cards.forEach(card => {
            const orderButton = card.querySelector(".product-card__button");
            const bottom = card.querySelector(".product-card__bottom");
            if (!bottom || bottom.querySelector("[data-favorite-toggle]")) return;

            const name = orderButton?.dataset.product ||
                card.querySelector(".product-card__title")?.textContent.trim();
            if (!name) return;

            bottom.append(makeFavoriteButton(name));
        });

        const detailOrder = scope.querySelector(".product-detail__order-button");
        const detailInfo = scope.querySelector(".product-detail__info");
        if (detailOrder && detailInfo && !detailInfo.querySelector("[data-favorite-toggle]")) {
            const name = detailOrder.dataset.product;
            if (name) {
                const actions = document.createElement("div");
                actions.className = "product-detail__actions";
                detailOrder.parentNode.insertBefore(actions, detailOrder);
                actions.append(detailOrder, makeFavoriteButton(name, "favorite-toggle--detail"));
            }
        }
    }

    function updateButtons() {
        const saved = readFavorites();
        document.querySelectorAll("[data-favorite-toggle]").forEach(button => {
            const name = button.dataset.productName;
            const active = saved.includes(name);
            button.classList.toggle("is-active", active);
            button.innerHTML = `<span aria-hidden="true">${active ? "♥" : "♡"}</span>`;
            button.setAttribute("aria-pressed", String(active));
            button.setAttribute("aria-label",
                `${active ? "Удалить" : "Добавить"} «${name}» ${active ? "из" : "в"} избранное`);
        });
    }

    function updateCounters() {
        const count = readFavorites().length;
        document.querySelectorAll("[data-favorites-count]").forEach(node => {
            node.textContent = String(count);
            node.hidden = count === 0;
        });
    }

    function renderFavoritesPage() {
        const grid = document.querySelector("#favorites-products");
        if (!grid) return;

        const saved = readFavorites();
        const selected = saved
            .map(name => productsList.find(product => product.name === name))
            .filter(Boolean);

        grid.replaceChildren();

        if (!selected.length) {
            const empty = document.createElement("div");
            empty.className = "empty-state favorites-empty";
            empty.innerHTML = `
                <h2>СПИСОК ПОКА ПУСТ</h2>
                <p>Добавляйте товары в избранное, нажимая на значок сердца в карточке товара.</p>
                <a class="button button--primary" href="catalog.html">ПЕРЕЙТИ В КАТАЛОГ</a>
            `;
            grid.append(empty);
            return;
        }

        selected.forEach((product, index) => {
            const card = document.createElement("article");
            card.className = "product-card";
            card.innerHTML = `
                <a class="product-card__image-wrap"
                   href="product.html?name=${encodeURIComponent(product.name)}"
                   aria-label="Подробнее: ${escapeHtml(product.name)}">
                    <img class="product-card__img" src="${escapeHtml(product.image)}"
                         alt="${escapeHtml(product.name)}" loading="lazy">
                </a>
                <p class="product-card__code">ITEM / ${String(index + 1).padStart(3, "0")} — SAVED</p>
                <h3 class="product-card__title">
                    <a href="product.html?name=${encodeURIComponent(product.name)}">${escapeHtml(product.name)}</a>
                </h3>
                <p class="product-card__description">${escapeHtml(product.description)}</p>
                <div class="product-card__bottom">
                    <p class="product-card__price">${priceText(product.price)}</p>
                    <button class="button button--order product-card__button" type="button"
                        data-product="${escapeHtml(product.name)}"
                        data-price="${priceText(product.price)}"
                        data-image="${escapeHtml(product.image)}">ЗАКАЗАТЬ <span>↗</span></button>
                </div>
            `;
            grid.append(card);
        });

        decorateCards(grid);
        updateButtons();
    }

    function updateAll() {
        updateCounters();
        updateButtons();
        renderFavoritesPage();
    }

    document.addEventListener("click", event => {
        const button = event.target.closest("[data-favorite-toggle]");
        if (!button) return;

        const name = button.dataset.productName;
        if (!name) return;

        const saved = readFavorites();
        const next = saved.includes(name)
            ? saved.filter(item => item !== name)
            : [...saved, name];

        writeFavorites(next);
    });


function initialize() {
    decorateCards();
    updateAll();

    let decorating = false;

    const observer = new MutationObserver(records => {
        if (decorating) return;

        const addedElements = [];

        for (const record of records) {
            record.addedNodes.forEach(node => {
                if (node.nodeType === Node.ELEMENT_NODE) {
                    addedElements.push(node);
                }
            });
        }

        if (!addedElements.length) return;

        decorating = true;

        requestAnimationFrame(() => {
            addedElements.forEach(node => {
                if (node.isConnected) {
                    decorateCards(node);
                }
            });

            updateButtons();
            decorating = false;
        });
    });

    observer.observe(document.body, {
        childList: true,
        subtree: true
    });
}


    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", initialize, { once: true });
    } else {
        initialize();
    }

    window.addEventListener("storage", event => {
        if (event.key === STORAGE_KEY) updateAll();
    });
})();
