import { components } from '../view/index.js';
import auth from '../js/authFirebase.js';
import {
  validateEmail,
} from '../js/validation.js';
// import validation from '../js/validation.js';

const changeView = (route) => {
  const container = document.getElementById('container');
  container.innerHTML = '';
  switch (route) {
    case '': {
      window.location.hash = '#';
    }
    // eslint-disable-next-line no-fallthrough
    case '#/': {
      container.appendChild(components.login());
      document.getElementById('btnLogin').addEventListener('click', (event) => {
        event.preventDefault();
        const email = document.getElementById('userEmail').value;
        const password = document.getElementById('userPassword').value;
        /* Validación del dom */
        const emailerror = document.getElementById('emailerror');
        const passerror = document.getElementById('passerror');
        if (email === '' || !validateEmail(email)) {
          emailerror.style.display = 'block';
          emailerror.innerHTML = 'Debes ingresar un correo válido.';
        } else {
          emailerror.style.display = 'none';
          emailerror.innerHTML = '';
          if (password === '' || password.length < 6) {
            passerror.style.display = 'block';
            passerror.innerHTML = 'Debes ingresar una contraseña con minimo 6 caracteres.';
          } else {
            passerror.style.display = 'none';
            passerror.innerHTML = '';
            auth.signIn(email, password);
          }
        }
      });
      document
        .getElementById('btnFacebook')
        .addEventListener('click', () => auth.loginFacebook());

      return document
        .getElementById('btnGmail')
        .addEventListener('click', () => auth.loginGoogle());
    }
    case '#/registrate': {
      container.appendChild(components.check());
      return document
        .getElementById('btnLoginTwo')
        .addEventListener('click', () => {
          const newUserName = document.getElementById('user-name').value;
          const newUserLastName = document.getElementById('user-lastname').value;
          const newUserEmail = document.getElementById('email').value;
          const newUserPass = document.getElementById('password').value;
          const newUserPassConfirm = document.getElementById('password-confirm').value;
          // validando que las contraseñas coincidan
          let validationOk = true;
          if (newUserPass !== newUserPassConfirm) {
            document.getElementById('pass-error').style.display = 'block';
            document.getElementById('pass-error').innerHTML = 'Contraseñas no coinciden';
            document.getElementById('password').value = '';
            document.getElementById('password-confirm').value = '';

            validationOk = false;
          } else {
            document.getElementById('pass-error').style.display = 'none';
          }
          // Validando que las contraseñas sean mayor o igua a 6 digitos
          if (newUserPass === '' || newUserPass.length < 6) {
            document.getElementById('pass-error').style.display = 'block';
            document.getElementById('pass-error').innerHTML = 'Debes ingresar una contraseña con minimo 6 caracteres.';

            validationOk = false;
          } else {
            document.getElementById('pass-error').style.display = 'none';
          }
          // validando que sea un correo valido
          if (newUserEmail === '' || !validateEmail(newUserEmail)) {
            document.getElementById('email-error').style.display = 'block';
            document.getElementById('email-error').innerHTML = 'Debes ingresar un correo válido.';
            document.getElementById('email').value = '';

            validationOk = false;
          } else {
            document.getElementById('email-error').style.display = 'none';
          }
          // validando que ingrese un su nombre
          if (newUserName === '') {
            document.getElementById('name-error').style.display = 'block';
            document.getElementById('name-error').innerHTML = 'Debes ingresar tu nombre';
            validationOk = false;
          } else {
            document.getElementById('name-error').style.display = 'none';
          }
          // validando que ingrese su apellido
          if (newUserLastName === '') {
            document.getElementById('lastname-error').style.display = 'block';
            document.getElementById('lastname-error').innerHTML = 'Debes ingresar tu apellido';
            validationOk = false;
          } else {
            document.getElementById('lastname-error').style.display = 'none';
          }
          if (validationOk) {
            // proceso de registro
            auth
              .singUp(newUserEmail, newUserPass)
              .then((user) => {
                console.log(user);
                const uid = user.uid;
                if (user.email === newUserEmail) {
                  console.log('EXITOSO');
                  user
                    .add(uid, newUserEmail, newUserPass)
                    .then((result) => {
                      console.log(result);
                    }).catch((error) => {
                      console.log('Error: ', error);
                    });
                } else {
                  console.log('No se registro');
                }
              })
              .catch((error) => {
                console.log('Error: ', error);
              });
          }
        });
    }
    case '#/home': {
      container.appendChild(components.home());

      break;
    }
    default:
      container.appendChild(components.pageError());
      break;
  }
  return 0;
};

export { changeView };
/* case '#/': {
      container.appendChild(components.login());
      document.getElementById('btnLogin').addEventListener('click', (event) => {
        event.preventDefault();
        const email = document.getElementById('userEmail').value;
        const password = document.getElementById('userPassword').value;
        if (email === '' || password === '') {
          alert('Campos vacios');
        } else if (validation.validateUser(email)) {
          if (validation.validatePassword(password)) {
            auth
              .singIn(email, password)
              .then((user) => {
                // console.log('User: ', user);
                if (user.email === email) {
                  window.location.hash = '#/home';
                } else {
                  alert('usuario o contraseña incorrectos');
                }
              })
              .catch((error) => {
                alert(error);
              });
          } else {
            alert('Password no valido');
          }
        } else {
          alert('Correo no valido');
        }
      });
      document
        .getElementById('btnFacebook')
        .addEventListener('click', () => auth.loginFacebook());
      return document
        .getElementById('btnGmail')
        .addEventListener('click', () => auth.loginGoogle());
    }
    case '#/registrate': {
      container.appendChild(components.check());
      return document
        .getElementById('btnLoginTwo')
        .addEventListener('click', () => {
          const email = document.getElementById('email');
          const password = document.getElementById('password');
          /* const passwordConfirm = document.getElementById('passwordConfirm');
          const name = document.getElementById('name');
          const surname = document.getElementById('surname');
          const profession = document.getElementById('profession');
          // console.log('User: ', email.value, ' - ', password.value);
          auth
            .singUp(email.value, password.value)
            .then((user) => {
              // console.log(user);
              if (user.email === email.value) {
                window.location.hash = '#/';
                alert('EXITOSO');
              } else {
                alert('No se registro');
              }
            })
            .catch(() => {
              alert('Debe llenar todo el formulario');
            });
        });
    } */
