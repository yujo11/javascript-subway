import { API, showSnackbar } from '../utils/index.js';
import { KEY, SNACKBAR_MESSAGE } from '../constants/index.js';
import { renderTemplate } from '../view/renderTemplate.js';

export const handlerSignupSubmit = async (e) => {
  e.preventDefault();

  const name = e.target.elements['signup-name'].value;
  const email = e.target.elements['signup-email'].value;
  const password = e.target.elements['signup-password'].value;
  const confirmPassword = e.target.elements['signup-password-confirm'].value;

  // TODO
  // 스낵바 대신 입력창 하단에 메세지 출력하기
  if (password !== confirmPassword) {
    showSnackbar(SNACKBAR_MESSAGE.NOT_MATCH_CONFIRM_PASSWORD);
    return;
  }

  const response = await API.signup({ email, password, name });

  if (!response.ok) {
    showSnackbar(SNACKBAR_MESSAGE.SIGNUP_FAILURE);
    return;
  }

  showSnackbar(SNACKBAR_MESSAGE.SIGNUP_SUCCESS);
  renderTemplate(KEY.LOGIN);
};
