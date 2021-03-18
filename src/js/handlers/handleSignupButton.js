import { KEY } from '../constants/index.js';
import { renderTemplate } from '../view/index.js';

export const handleSignupButton = (e) => {
  e.preventDefault();

  renderTemplate(KEY.SINGUP);
};
