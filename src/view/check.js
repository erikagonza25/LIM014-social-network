import { signUp, emailVerification } from '../js/auth.js';
import { userData } from '../js/firestore.js';
import { validateEmail } from '../js/validation.js';

export default () => {
  const viewCheck = document.createElement('section');
  viewCheck.classList.add('container');
  viewCheck.innerHTML = `
  <section class="forms-container">
    <section class="signin-signup">
      <form action="#" class="sign-in-form">
        <img src="imageProject/iconWartay.png" id="logoR" class="logo" alt="" />
        <section class="cuadro">
        <section class="input-field">
          <i></i>
          <input id="user-name" type="text" placeholder="Ingresa tu nombre" required />
          <p class="col-12 error" id="name-error"></p>
        </section>
        <section class="input-field">
          <i></i>
          <input id="user-lastname" type="text" placeholder="Ingresa tu apellido" required />
          <p class="col-12 error" id="lastname-error"></p>
        </section>
        <section class="input-field">
          <i></i>
          <input id="email" type="email" placeholder="Ingresa tu correo" required />
          <p class="col-12 error" id="email-error"></p>
        </section>
          <select id="select" class="input-field" name="Orden">
            <option value="" disabled selected>Ejem.Prof, estudiante, padre</option>
            <option value="za">Profesora</option>
            <option value="za">Padre</option>
            <option value="za">Madre</option>
            <option value="za">Estudiante</option>
        </select>
        <section class="input-field">
          <i></i>
          <input id="password" type="password" placeholder="Ingrese su contraseña" />
        </section>
        <section class="input-field">
          <i></i>
          <input id= "password-confirm" type="password" placeholder="Confirme su contraseña" />
          <p class="col-12 error" id="pass-error"></p>
        </section>
        <input type="submit" id="btnLoginTwo" class="btn btnR" value="Crear cuenta" />
            </section>
        </form>
      </section>
    </section>
    </section>

  <section class="panels-container">
  <section class="panel left-panel">
  <section class="content">
    <h3 class="h3">Si ya estas registrado</h3>
    <p class="pa">
      Da click en nuestro botón de login para que ingreses con tu cuenta
    </p>
    <button class="btn transparent" id="signInBtn">
    Login
    </button>
  </section>
  <img src="imageProject/logoD.png" class="image" alt="" />
</section>
</section>
</section>`;
  // Evento para regresar a Login
  const signInBtn = viewCheck.querySelector('#signInBtn');
  signInBtn.addEventListener('click', () => { window.location.hash = ''; });
  // Función de Inicio de sesión
  const checkBotton = viewCheck.querySelector('#btnLoginTwo');
  checkBotton.addEventListener('click', (e) => {
    e.preventDefault();
    const newUserName = document.getElementById('user-name').value;
    const newUserLastName = document.getElementById('user-lastname').value;
    const newUserEmail = document.getElementById('email').value;
    const newUserPass = document.getElementById('password').value;
    const newUserPassConfirm = document.getElementById('password-confirm').value;
    // Validando que las contraseñas conincidan
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
    // Validando que las contraseñas sean mayor o igual a 6 digitos
    if (newUserPass === '' || newUserPass.length < 6) {
      document.getElementById('pass-error').style.display = 'block';
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
      signUp(newUserEmail, newUserPass)
        .then((result) => {
          const dataUser = {
            uid: result.user.uid,
            email: newUserEmail,
            firstnames: newUserName,
            lastnames: newUserLastName,
          };
          userData(dataUser)
            .then((resu) => {
              emailVerification(resu);
              alert('Se registro exitosamente, se envio un correo para la verificación');
              window.location.hash = '#/';
            }).catch((error) => {
              console.log(error);
            });
        })
        .catch(() => {
          alert('La dirección de correo electrónico ya está siendo utilizada por otra cuenta');
        });
    }
  });
  return viewCheck;
};
