import '../css/index.css';

const App = () => {
  document.querySelector('header').addEventListener('click', (e) => {
    e.preventDefault();
    const url = e.target.closest('a').getAttribute('href');
    history.pushState({ url }, null, url);
    render(url);
  });
};

const routes = {
  stations: '/stations',
  lines: '/lines',
  sections: '/sections',
  map: '/map',
  search: '/seacrh',
  login: '/login',
};

const titles = {
  stations: '🚉 역 관리',
  lines: '🛤️ 노선 관리',
  sections: '🔁 구간 관리',
  map: '🗺️ 전체 보기',
  search: '🔎 길 찾기',
  login: '👤 로그인',
};

const render = async (url) => {
  document.title = titles[url];
};

window.addEventListener('DOMContentLoaded', () => {
  App();
});
