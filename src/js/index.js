// import '../css/index.css';
import { $ } from './utils/index.js';
import {
  mainTemplate,
  stationsTemplate,
  linesTemplate,
  sectionsTemplate,
  loginTemplate,
  signupTemplate,
} from './templates/index.js';
import { renderTemplate } from './view/index.js';
import { handleSignupButton, handleNavigationButton, handlerSignupSubmit } from './handlers/index.js';

const initRender = () => {
  const templates = [mainTemplate, stationsTemplate, linesTemplate, sectionsTemplate, loginTemplate, signupTemplate];

  $('#main-container').innerHTML = templates.map((template) => template()).join('');
};

const bindEvent = () => {
  $('header').addEventListener('click', handleNavigationButton);
  $('.login-form__signup-button').addEventListener('click', handleSignupButton);
  $('.signup-container__form').addEventListener('submit', handlerSignupSubmit);
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
