// Función que valida el correo
function validateEmail(email) {
  const regEx = /^([A-Za-z0-9_\-.])+@([A-Za-z0-9_\-.])+\.([A-Za-z]{2,4})$/;
  return regEx.test(email);
}
// Función que valida el input del correo
const validateUser = (emailLogin) => {
  if (
    emailLogin === ''
    || emailLogin === 0
    || !validateEmail(emailLogin)
  ) {
    return false;
  }
  return true;
};
// Función que valida el password
const validatePassword = (passwordLogin) => {
  if (passwordLogin.length < 6 || passwordLogin === '') {
    return false;
  }
  return true;
};

export default {
  validateEmail,
  validateUser,
  validatePassword,
};
