import { KEY } from '../constants/index.js';
import { $, $$, hideElement, showElement } from '../utils/index.js';

const templates = {
  [KEY.MAIN]: 'main-container',
  [KEY.STATIONS]: 'stations-container',
  [KEY.LINES]: 'lines-container',
  [KEY.SECTIONS]: 'sections-container',
  [KEY.LOGIN]: 'login-container',
  [KEY.SIGNUP]: 'signup-container',
  [KEY.REQUEST_LOGIN]: 'request-login-container',
};

const titles = {
  [KEY.MAIN]: '🚇 지하철 노선도',
  [KEY.STATIONS]: '🚉 역 관리',
  [KEY.LINES]: '🛤️ 노선 관리',
  [KEY.SECTIONS]: '🔁 구간 관리',
  [KEY.LOGIN]: '👤 로그인',
  [KEY.SIGNUP]: '📝 회원가입',
};

export const showTemplate = (target) => {
  $$('main > .container').forEach((container) => hideElement(container));
  showElement($(`.${target}`));
};

export const renderTemplate = (url) => {
  document.title = titles[url];
  showTemplate(templates[url]);
};
