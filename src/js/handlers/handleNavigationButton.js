import { $$ } from '../utils/querySelector.js';
import { renderTemplate } from '../view/index.js';

const changeSelectedButtonColor = (target) => {
  $$('.navigation-button').forEach((button) => button.classList.remove('bg-cyan-100'));

  if (target.id === 'navigation-main') {
    return;
  }

  target.classList.add('bg-cyan-100');
};

export const handleNavigationButton = (e) => {
  e.preventDefault();

  if (!e.target.classList.contains('btn')) {
    return;
  }

  const url = e.target.closest('.navigation-link').getAttribute('href');
  history.pushState({ url }, null, url);
  changeSelectedButtonColor(e.target);
  renderTemplate(url);
};
