document.addEventListener('DOMContentLoaded', () => {
  const dialog = document.getElementById('projectLightbox');
  const openButton = document.querySelector('[data-lightbox-trigger]');
  const closeButton = document.querySelector('[data-lightbox-close]');
  if (!dialog || !openButton || !closeButton) return;
  openButton.addEventListener('click', () => { if (typeof dialog.showModal === 'function') dialog.showModal(); });
  closeButton.addEventListener('click', () => dialog.close());
  dialog.addEventListener('click', event => { if (event.target === dialog) dialog.close(); });
  document.addEventListener('keydown', event => { if (event.key === 'Escape' && dialog.open) dialog.close(); });
});
