(() => {
    const button = document.querySelector(".to-top");
    const topbar = document.getElementById("topbar");
    const footerTopLink = document.querySelector('.site-footer__bottom a[href="#topbar"]');

    const scrollToTop = (event) => {
        if (event) event.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    };

    if (button && topbar) {
        const updateVisibility = () => {
            button.hidden = window.scrollY <= topbar.offsetHeight;
        };

        button.addEventListener("click", scrollToTop);
        window.addEventListener("scroll", updateVisibility, { passive: true });
        window.addEventListener("resize", updateVisibility);
        updateVisibility();
    }

    footerTopLink?.addEventListener("click", scrollToTop);
})();
