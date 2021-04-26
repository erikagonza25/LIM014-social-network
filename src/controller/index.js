import { components } from '../view/index.js';
import auth from '../js/authFirebase.js';
import validation from '../js/validation.js';

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
          // const passwordConfirm = document.getElementById('passwordConfirm');
          // const name = document.getElementById('name');
          // const surname = document.getElementById('surname');
          // const profession = document.getElementById('profession');
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
