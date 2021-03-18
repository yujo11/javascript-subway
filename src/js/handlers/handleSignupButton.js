import { KEY } from '../constants/index.js';
import { renderTemplate } from '../view/index.js';

export const handleSignupButton = (e) => {
  e.preventDefault();

  history.pushState({ url: KEY.SIGNUP }, null, KEY.SIGNUP);
  renderTemplate(KEY.SIGNUP);
};
