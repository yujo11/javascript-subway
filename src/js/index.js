import '../css/index.css';
import { KEY } from './constants/index.js';
import {
  linesTemplate,
  sectionsTemplate,
  loginTemplate,
  stationsTemplate,
  mainTemplate,
  signupTemplate,
} from './templates/index.js';
import { $, $$, hideElement, showElement } from './utils/index.js';

const templates = {
  [KEY.MAIN]: 'main-container',
  [KEY.STATIONS]: 'stations-container',
  [KEY.LINES]: 'lines-container',
  [KEY.SECTIONS]: 'sections-container',
  [KEY.LOGIN]: 'login-container',
  [KEY.SINGUP]: 'signup-container',
};

const titles = {
  [KEY.MAIN]: '🚇 지하철 노선도',
  [KEY.STATIONS]: '🚉 역 관리',
  [KEY.LINES]: '🛤️ 노선 관리',
  [KEY.SECTIONS]: '🔁 구간 관리',
  [KEY.MAP]: '🗺️ 전체 보기',
  [KEY.SEARCH]: '🔎 길 찾기',
  [KEY.LOGIN]: '👤 로그인',
  [KEY.SINGUP]: '📝 회원가입',
};

const showTemplate = (target) => {
  $$('main > .container').forEach((container) => hideElement(container));
  showElement($(`.${target}`));
};

const render = (url) => {
  document.title = titles[url];
  showTemplate(templates[url]);
};

const handleNavigationButton = (e) => {
  e.preventDefault();

  if (e.target.nodeName !== 'BUTTON') {
    return;
  }

  const url = e.target.closest('a').getAttribute('href');
  history.pushState({ url }, null, url);
  render(url);
};

const bindEvent = () => {
  $('header').addEventListener('click', handleNavigationButton);
};

const initRender = () => {
  const templates = [
    mainTemplate,
    stationsTemplate,
    linesTemplate,
    sectionsTemplate,
    loginTemplate,
    signupTemplate,
  ];

  $('#main-container').innerHTML = templates
    .map((template) => template())
    .join('');
};

const App = () => {
  bindEvent();
  initRender();
};

window.addEventListener('DOMContentLoaded', () => {
  App();
});

window.addEventListener('popstate', () => {
  render(window.location.pathname);
});
