// import '../css/index.css';
import { $, getLocalStorageItem } from './utils/index.js';
import { LOCAL_STORAGE_KEY } from './constants/index.js';
import { renderTemplate } from './view/index.js';
import {
  mainTemplate,
  stationsTemplate,
  linesTemplate,
  sectionsTemplate,
  loginTemplate,
  signupTemplate,
  requestLoginTemplate,
  headerTemplate,
} from './templates/index.js';
import {
  handleSignupButton,
  handleNavigationButton,
  handlerSignupSubmit,
  handleLoginSubmit,
  changeLoginButton,
} from './handlers/index.js';

const initHeader = (token) => {
  $('header').innerHTML = headerTemplate(token);
};

const initRender = () => {
  const templates = [
    mainTemplate,
    stationsTemplate,
    linesTemplate,
    sectionsTemplate,
    loginTemplate,
    signupTemplate,
    requestLoginTemplate,
  ];

  $('#main-container').innerHTML = templates.map((template) => template()).join('');
};

const bindEvent = () => {
  $('header').addEventListener('click', handleNavigationButton);
  $('#signup-button').addEventListener('click', handleSignupButton);
  $('#signup-form').addEventListener('submit', handlerSignupSubmit);
  $('#login-form').addEventListener('submit', handleLoginSubmit);
};

const App = () => {
  const token = getLocalStorageItem({ key: LOCAL_STORAGE_KEY.TOKEN, defaultValue: '' });
  initHeader(token);
  initRender();
  bindEvent();
};

window.addEventListener('DOMContentLoaded', () => {
  App();
});

window.addEventListener('popstate', () => {
  renderTemplate(window.location.pathname);
});
