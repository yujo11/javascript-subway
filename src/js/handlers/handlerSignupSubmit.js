import { API } from '../utils/index.js';

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
    alert('회원가입에 실패했습니다.');
  }
};
