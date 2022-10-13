document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('article').forEach((btn) => {
    btn.addEventListener('click', (e) => {
      window.open(`/${btn.id}`);
    });
  })
});
