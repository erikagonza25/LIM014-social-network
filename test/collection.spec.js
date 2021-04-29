import collection from '../src/js/users.js';

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
describe('Crea una coleccion de usuario', () => {
  it('deberia ser una función', () => {
    expect(typeof collection.add).toBe('function');
  });
  it('Deberia crear la coleccion de usuarios con sus respectivos campos', () => collection.add('Erika', 'erika@gmail.com')
    .then((user) => {
      expect(user.name).toBe('Erika');
    }));
});
