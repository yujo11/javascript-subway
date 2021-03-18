// import '../css/index.css';
import { $ } from './utils/index.js';
import { renderTemplate } from './view/index.js';
import {
  mainTemplate,
  stationsTemplate,
  linesTemplate,
  sectionsTemplate,
  loginTemplate,
  signupTemplate,
  requestLoginTemplate,
} from './templates/index.js';
import {
  handleSignupButton,
  handleNavigationButton,
  handlerSignupSubmit,
  handleLoginSubmit,
} from './handlers/index.js';

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
  initRender();
  bindEvent();
};

window.addEventListener('DOMContentLoaded', () => {
  App();
});

window.addEventListener('popstate', () => {
  renderTemplate(window.location.pathname);
});
