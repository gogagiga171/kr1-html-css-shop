(() => {
    const STORAGE_KEY = "instrumental-theme";
    const root = document.documentElement;

    function getTheme() {
        try {
            const saved = localStorage.getItem(STORAGE_KEY);
            return saved === "light" ? "light" : "dark";
        } catch {
            return "dark";
        }
    }

    function applyTheme(theme) {
        root.dataset.theme = theme;
        try {
            localStorage.setItem(STORAGE_KEY, theme);
        } catch {}
        const button = document.querySelector("[data-theme-toggle]");
        if (button) {
            const light = theme === "light";
            button.setAttribute("aria-label", light ? "Включить тёмную тему" : "Включить светлую тему");
            button.setAttribute("aria-pressed", String(light));
            button.innerHTML = light ? '<span class="theme-toggle__symbol" aria-hidden="true">☾</span><span class="theme-toggle__label">ТЁМНАЯ</span>' : '<span class="theme-toggle__symbol" aria-hidden="true">☀</span><span class="theme-toggle__label">СВЕТЛАЯ</span>';
        }
    }

    // Применяем сохранённую тему до отрисовки элементов.
    applyTheme(getTheme());

    function addHeaderControls() {
        const header = document.querySelector(".site-header__inner");
        if (!header || header.querySelector(".header-tools")) return;

        const tools = document.createElement("div");
        tools.className = "header-tools";
        tools.innerHTML = `
            <a class="header-favorites" href="favorites.html" aria-label="Избранное">
                <span class="header-favorites__heart" aria-hidden="true">♡</span>
                <span class="header-favorites__label">ИЗБРАННОЕ</span>
                <b class="favorites-count" data-favorites-count hidden>0</b>
            </a>
            <button class="theme-toggle" type="button" data-theme-toggle aria-pressed="false">
                <span class="theme-toggle__symbol" aria-hidden="true">☀</span>
                <span class="theme-toggle__label">СВЕТЛАЯ</span>
            </button>
        `;
        const cta = header.querySelector(".header-cta");
        if (cta) header.insertBefore(tools, cta);
        else header.append(tools);

        applyTheme(getTheme());
    }

    document.addEventListener("DOMContentLoaded", addHeaderControls);
    if (document.readyState !== "loading") addHeaderControls();

    document.addEventListener("click", event => {
        const button = event.target.closest("[data-theme-toggle]");
        if (!button) return;
        applyTheme(root.dataset.theme === "light" ? "dark" : "light");
    });

    window.addEventListener("storage", event => {
        if (event.key === STORAGE_KEY) {
            root.dataset.theme = event.newValue === "light" ? "light" : "dark";
            applyTheme(root.dataset.theme);
        }
    });
})();
