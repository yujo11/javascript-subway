import { API, setLocalStorageItem, showSnackbar } from '../utils/index.js';
import { KEY, SNACKBAR_MESSAGE, LOCAL_STORAGE_KEY } from '../constants/index.js';
import { renderTemplate } from '../view/renderTemplate.js';
import { changeSelectedButtonColor } from './index.js';

export const handleLoginSubmit = async (e) => {
  e.preventDefault();

  const email = e.target.elements['login-email'].value;
  const password = e.target.elements['login-password'].value;
  const response = await API.login({ email, password });

  if (!response.accessToken) {
    showSnackbar(SNACKBAR_MESSAGE.LOGIN_FAILURE);
    return;
  }

  setLocalStorageItem({ key: LOCAL_STORAGE_KEY.TOKEN, item: response.accessToken });
  showSnackbar(SNACKBAR_MESSAGE.LOGIN_SUCCESS);
  renderTemplate(KEY.MAIN);
  history.pushState({ url: KEY.MAIN }, null, KEY.MAIN);
  changeSelectedButtonColor();
};
