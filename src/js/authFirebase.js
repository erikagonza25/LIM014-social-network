// Función para registrarse
const signUp = (email, password) => firebase.auth().createUserWithEmailAndPassword(email, password);
// Función para loguearse
const signIn = (email, password) => firebase.auth().signInWithEmailAndPassword(email, password);
// verificacion de correo
function emailVerification(email) {
  firebase.auth().currentUser.sendEmailVerification(email).then(() => {
    console.log('enviamos correo');
  }).catch((error) => {
    console.log(error);
  });
}
// Función para entrar por gmail
function loginGoogle() {
  const provider = new firebase.auth.GoogleAuthProvider();
  return firebase.auth().signInWithPopup(provider);
}
// Función para entrar por facebook
function loginFacebook() {
  const provider = new firebase.auth.FacebookAuthProvider();
  return firebase.auth().signInWithPopup(provider);
}
export default {
  signUp,
  signIn,
  loginGoogle,
  loginFacebook,
  emailVerification,
};
