import { KEY } from '../constants/standard.js';
import { $$ } from '../utils/querySelector.js';
import { renderTemplate, showTemplate } from '../view/index.js';

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

  // TODO
  // LOGIN CORS가 해결되면 getStationList로 request를 보내서 토큰이 올바른지 검증
  const token = false;
  history.pushState({ url }, null, url);
  changeSelectedButtonColor(e.target);

  if (token) {
    renderTemplate(url);
    return;
  }

  url === KEY.LOGIN ? renderTemplate(url) : showTemplate('request-login-container');
};
