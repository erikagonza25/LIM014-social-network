// eslint-disable-next-line global-require
const auth = require('../src/js/authFirebase.js');

jest.mock('../src/js/authFirebase.js');
// eslint-disable-next-line no-unused-vars
it('Fue llamada la función', (done) => {
  /* auth.mockImplementation({
    emailVerification: () => {
      console.log('HOLA');
      expect(typeof auth.emailVerification).toBe('function');
      done();
    },
  }); */
  auth.emailVerification.mockImplementation(() => console.log('Hola que tal') && done());
  auth.signUp('front@end.la', '123456');
});
