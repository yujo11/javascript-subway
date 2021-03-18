import { renderTemplate } from '../view/index.js';

export const handleNavigationButton = (e) => {
  e.preventDefault();

  if (!e.target.classList.contains('btn')) {
    return;
  }

  const url = e.target.closest('.navigation-link').getAttribute('href');
  history.pushState({ url }, null, url);
  renderTemplate(url);
};
