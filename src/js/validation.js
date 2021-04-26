// Función que valida el correo
export const validateEmail = (email) => {
  // expresión regular que simula el patron de búsqueda del correo electrónico
  const regEx = /^([A-Za-z0-9_\-.])+@([A-Za-z0-9_\-.])+\.([A-Za-z]{2,4})$/;
  return regEx.test(email);
};
// funcion que valida si los datos de usuario ne estan vacios y email es valido

export const validateUser = (userEmail, userPass) => {
  if (
    !validateEmail(userEmail)
    || userEmail === ''
    || userPass === ''
    || userPass < 6
  ) {
    return false;
  }
  return true;
};
// valida datos de nuevo usuario
export const validateNewUser = (
  newUserEmail,
  newUserPass,
  newUserName,
  newUserLastName,
) => {
  if (
    !validateEmail(newUserEmail)
    || newUserEmail === ''
    || newUserPass === ''
    || newUserPass < 6
    || newUserName === ''
    || newUserLastName === ''
  ) {
    return false;
  }
  return true;
};
/* // Función que valida el correo
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
// Función para validar el input name
const validateName = (nicknameCheckin) => {
  if (nicknameCheckin === '' || nicknameCheckin.length === 0) {
    return false;
  }
  return true;
};

// Función para validar el input passwordRepeat
const validatePasswordRepeat = (passwordRepeat, passwordCheckin) => {
  if (passwordRepeat !== passwordCheckin) {
    return false;
  }
  return true;
};
export default {
  validatePasswordRepeat,
  validateName,
  validateEmail,
  validateUser,
  validatePassword,
};
*/
