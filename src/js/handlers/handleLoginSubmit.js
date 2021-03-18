import { API, setLocalStorageItem, showSnackbar } from '../utils/index.js';
import { KEY, SNACKBAR_MESSAGE, LOCAL_STORAGE_KEY } from '../constants/index.js';
import { renderTemplate } from '../view/renderTemplate.js';

export const handleLoginSubmit = async (e) => {
  e.preventDefault();

  const email = e.target.elements['login-email'].value;
  const password = e.target.elements['login-password'].value;

  // TODO
  // 현재 CORS에러 발생으로 동작 검증 못 함.
  const response = await API.login({ email, password });
  setLocalStorageItem({ key: LOCAL_STORAGE_KEY.TOKEN, item: response.accessToken });

  if (!response.ok) {
    showSnackbar(SNACKBAR_MESSAGE.LOGIN_FAILURE);
    return;
  }

  showSnackbar(SNACKBAR_MESSAGE.LOGIN_SUCCESS);
  renderTemplate(KEY.STATIONS);
};
