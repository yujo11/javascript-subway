import '../css/index.css';
import { KEY } from './constants/index.js';
import {
  linesTemplate,
  sectionsTemplate,
  loginTemplate,
  stationsTemplate,
} from './templates/index.js';

const App = () => {
  document.querySelector('header').addEventListener('click', (e) => {
    e.preventDefault();

    const url = e.target.closest('a').getAttribute('href');
    history.pushState({ url }, null, url);
    render(url);
  });
};

const titles = {
  [KEY.STATIONS]: '🚉 역 관리',
  [KEY.LINES]: '🛤️ 노선 관리',
  [KEY.SECTIONS]: '🔁 구간 관리',
  [KEY.MAP]: '🗺️ 전체 보기',
  [KEY.SEARCH]: '🔎 길 찾기',
  [KEY.LOGIN]: '👤 로그인',
};

const templates = {
  [KEY.STATIONS]: stationsTemplate,
  [KEY.LINES]: linesTemplate,
  [KEY.SECTIONS]: sectionsTemplate,
  [KEY.LOGIN]: loginTemplate,
};

const render = (url) => {
  const $mainContainer = document.querySelector('#main-container');
  document.title = titles[url];
  $mainContainer.innerHTML = templates[url]?.();
};

window.addEventListener('DOMContentLoaded', () => {
  App();
});
