const topbar = document.querySelector(".topbar");

if (topbar) {
    let lastScrollY = window.scrollY;
    let stripePosition = 0;

    window.addEventListener("scroll", () => {
        const currentScrollY = window.scrollY;
        const direction = currentScrollY > lastScrollY ? 1 : -1;

        stripePosition += direction * 5;
        topbar.style.setProperty("--stripe-position", `${stripePosition}px`);
        lastScrollY = currentScrollY;
    }, { passive: true });
}
