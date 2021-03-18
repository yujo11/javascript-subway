import { signupTemplate } from '../templates.js';

export class Signup {
  constructor() {
    this.$mainContainer = $('#main-container');
  }

  bindEvent() {
    $('.login-form__signup-button').addEventListener('click', (e) => {
      e.preventDefault();

      const url = e.target.getAttribute('href');
      history.pushState({ url }, null, url);
      render(url);
    });
  }

  render() {
    this.$mainContainer.innerHTML = signupTemplate();
    this.bindEvent();
  }
}
