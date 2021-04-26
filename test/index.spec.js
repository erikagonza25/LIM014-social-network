// importamos la funcion que vamos a testear
import validation from '../src/js/validation.js';

describe('validateUser', () => {
  it('email correct', () => {
    expect(validation.validateUser('erika.andreina.3@gmail.com')).toBe(true);
  });
  it('email fail', () => {
    expect(validation.validateUser('erika5501@')).toBe(false);
  });
});
describe('validatePassword', () => {
  it('password correct', () => {
    expect(validation.validatePassword('erika987654321')).toBe(true);
  });
  it('password fail', () => {
    expect(validation.validatePassword('1234')).toBe(false);
  });
});
