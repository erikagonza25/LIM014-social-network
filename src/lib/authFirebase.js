function singUp(email, password) {
  return new Promise((resolve, reject) => {
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((result) => {
        resolve(result.user);
      })
      .catch((error) => {
        reject(error.message);
      });
  });
}

function singIn(email, password) {
  return new Promise((resolve, reject) => {
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((result) => {
        resolve(result.user);
      })
      .catch((error) => {
        reject(error.message);
      });
  });
}

// Función para entrar por gmail

function loginGoogle() {
  if (!firebase.auth().currentUser) {
    const provider = new firebase.auth.GoogleAuthProvider();

    provider.addScope('https://www.googleapis.com/auth/contacts.readonly');
    firebase
      .auth()
      .signInWithPopup(provider)
      .then(() => {
        window.location.hash = '#/home';
      })
      .catch((error) => {
        const errorCode = error.code;

        if (errorCode === 'auth/account-exists-with-different-credential') {
          alert('Es el mismo usuario');
        }
      });
  } else {
    firebase.auth().singOut();
  }
}
// Función para entrar por facebook
function loginFacebook() {
  if (!firebase.auth().currentUser) {
    const provider = new firebase.auth.FacebookAuthProvider();

    provider.addScope('public_profile');
    firebase
      .auth()
      .signInWithPopup(provider)
      .then(() => {
        window.location.hash = '#/home';
      })
      .catch((error) => {
        const errorCode = error.code;
        if (errorCode === 'auth/account-exists-with-different-credential') {
          alert('Es el mismo usuario');
        }
      });
  } else {
    firebase.auth().singOut();
  }
}

export default {
  loginFacebook,
  loginGoogle,
  singUp,
  singIn,
};
