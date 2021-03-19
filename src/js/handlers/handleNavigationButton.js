import { KEY, LOCAL_STORAGE_KEY } from '../constants/index.js';
import { $, $$, getLocalStorageItem, setLocalStorageItem } from '../utils/index.js';
import { renderTemplate, showTemplate } from '../view/index.js';

const logout = () => {
  localStorage.removeItem(LOCAL_STORAGE_KEY.TOKEN);
  renderTemplate(KEY.LOGIN);
};

export const changeSelectedButtonColor = (target = '') => {
  $$('.navigation-button').forEach((button) => button.classList.remove('bg-cyan-100'));

  if (target.id === 'navigation-main' || !target) {
    return;
  }

  target.classList.add('bg-cyan-100');
};

export const changeLoginButton = (token) => {
  if (!token) {
    $('#navigation-login').classList.remove('d-none');
    $('#navigation-logout').classList.add('d-none');
    return;
  }

  $('#navigation-login').classList.add('d-none');
  $('#navigation-logout').classList.remove('d-none');
};

export const handleNavigationButton = (e) => {
  e.preventDefault();

  if (!e.target.classList.contains('btn')) {
    return;
  }

  if (e.target.id === 'navigation-logout') {
    logout();
    return;
  }

  const url = e.target.closest('.navigation-link').getAttribute('href');

  // TODO
  // LOGIN CORS가 해결되면 getStationList로 request를 보내서 토큰이 올바른지 검증
  history.pushState({ url }, null, url);
  changeSelectedButtonColor(e.target);

  const token = getLocalStorageItem({ key: LOCAL_STORAGE_KEY.TOKEN, defaultValue: '' });

  changeLoginButton(token);

  if (token) {
    renderTemplate(url);
    return;
  }

  url === KEY.LOGIN ? renderTemplate(url) : showTemplate('request-login-container');
};
