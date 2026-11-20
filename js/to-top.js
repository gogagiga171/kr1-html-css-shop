(() => {
  const button = document.querySelector('.to-top');
  const topbar = document.getElementById('topbar');
  if (!button || !topbar) return;

  const updateVisibility = () => {
    // Hide while the topbar is visible; show only after scrolling past it.
    const topbarBottom = topbar.getBoundingClientRect().bottom;
    button.hidden = topbarBottom >= 0;
  };

  button.addEventListener('click', () => {
    topbar.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });

  window.addEventListener('scroll', updateVisibility, { passive: true });
  window.addEventListener('resize', updateVisibility);
  updateVisibility();
})();
