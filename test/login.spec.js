// configurando firebase mock
// iniciando tests

import auth from '../src/js/authFirebase.js';

const firebasemock = require('firebase-mock');

const mockauth = new firebasemock.MockFirebase();
const mockfirestore = new firebasemock.MockFirestore();
mockfirestore.autoFlush();
mockauth.autoFlush();

global.firebase = firebasemock.MockFirebaseSdk(
  // use null if your code does not use RTDB
  () => null,
  () => mockauth,
  () => mockfirestore,
);

describe('función signIn', () => {
  it('Deberia ser una función', () => {
    expect(typeof auth.signIn).toBe('function');
  });
  it('Debería poder iniciar sesion', () => auth.signIn('front@end.la', '123456')
    .then((user) => {
      expect(user.email).toBe('front@end.la');
    }));
});
describe('función signUp', () => {
  it('Deberia ser una función', () => {
    expect(typeof auth.signUp).toBe('function');
  });

  it('Debería poder registrarse', () => auth.signUp('front@end.la', '123456')
    .then((user) => {
      expect(user.email).toBe('front@end.la');
    }));
  it('Debería ser una funcion', () => {
    expect(typeof auth.emailVerification).toBe('function');
  });
  // eslint-disable-next-line jest/no-focused-tests
});
describe('Debería poder iniciar sesion con cuenta de facebook', () => {
  it('Debería ser una funcion', () => {
    expect(typeof auth.loginFacebook).toBe('function');
  });
  it('Deberia poder iniciar sesión', () => auth.loginFacebook()
    .then((user) => {
      expect(user.isAnonymous).toBe(false);
    }));
});
describe('Debería poder iniciar sesion con cuenta de google', () => {
  it('Debería ser una funcion', () => {
    expect(typeof auth.loginGoogle).toBe('function');
  });
  it('Deberia poder iniciar sesión', () => auth.loginGoogle()
    .then((user) => {
      expect(user.isAnonymous).toBe(false);
    }));
});
describe('Debería enviar un correo de validación', () => {
  /* it('Deberia enviar el correo', () => auth.emailVerification()
    .then((user) => {
      expect(user).toBe('Hola');
    }));
  it('Deberia ser llamado', () => {
    const drink = jest.fn();
    auth.emailVerification();
    expect(drink).toHaveBeenCalled();
  });
   it('a', () => {
    const drink = jest.fn();
    auth.emailVerification(drink, 'lemon');
    expect(drink).toHaveBeenCalled();
  });
  it('Deberia enviar el correo', () => auth.emailVerification()
    .then((user) => {
      expect(user).toBe('Hola');
    }));
  it('b', () => {
    const prueba = jest.fn(() => true);

    auth.emailVerification();

    expect(prueba).toHaveReturned();
  }); */
});
