import { components } from '../view/index.js';
import auth from '../lib/authFirebase.js';

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
        auth
          .singIn(email, password)
          .then((user) => {
            console.log('User: ', user);
            if (user.email === email) {
              window.location.hash = '#/home';
            } else {
              console.log('usuario o contraseña incorrectos');
            }
          })
          .catch((error) => {
            alert(error);
          });
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
          console.log('User: ', email.value, ' - ', password.value);
          auth
            .singUp(email.value, password.value)
            .then((user) => {
              console.log(user);
              if (user.email === email.value) {
                window.location.hash = '#/';
                console.log('EXITOSO');
              } else {
                console.log('No se registro');
              }
            })
            .catch(() => {
              alert(new TypeError('Debe llenar todo el formulario'));
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
