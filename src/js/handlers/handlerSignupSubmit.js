import { API, showSnackbar } from '../utils/index.js';
import { SNACKBAR_MESSAGE } from '../constants/index.js';

export const handlerSignupSubmit = async (e) => {
  e.preventDefault();

  const name = e.target.elements['signup-name'].value;
  const email = e.target.elements['signup-email'].value;
  const password = e.target.elements['signup-password'].value;
  const confirmPassword = e.target.elements['signup-password-confirm'].value;

  if (password !== confirmPassword) {
    return;
  }

  const response = await API.signup({ email, password, name });

  if (!response.ok) {
    showSnackbar(SNACKBAR_MESSAGE.SIGNUP_FAILURE);
    return;
  }

  showSnackbar(SNACKBAR_MESSAGE.SIGNUP_SUCCESS);
};
