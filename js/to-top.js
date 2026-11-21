(() => {
    const button = document.querySelector('.to-top');
    const topbar = document.getElementById('topbar');

    if (!button || !topbar) return;

    const updateVisibility = () => {
        button.hidden = window.scrollY <= topbar.offsetHeight;
    };

    button.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    window.addEventListener('scroll', updateVisibility, { passive: true });
    window.addEventListener('resize', updateVisibility);

    updateVisibility();
})();

const footerTopLink = document.querySelector('.site-footer__bottom a[href="#topbar"]');

if (footerTopLink) {
    footerTopLink.addEventListener('click', (event) => {
        event.preventDefault();

        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}