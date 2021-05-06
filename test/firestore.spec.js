// importamos la funcion que vamos a testear
import MockFirebase from 'mock-cloud-firestore';
import {
  userData,
  getUserData,
  updateCurrentUser,
  postAdd,
  getPost,
  commentAdd,
  getComment,
  removePost,
  removeComment,
  profilePhoto,
  coveragePhoto,
  upgradePost,
  upgradeComment,
  upgradeLike,
} from '../src/js/firestore';

const fixtureData = {
  __collection__: {
    SN_Users: {
      __doc__: {
        uid_002: {
          username: 'Kelly',
          email: 'kelmita22@gmail.com',
          photo: '',
          photoCover: '',
          phone: '',
          birthday: 'yyyy-MM-dd',
          country: '',
          description: '',
        },
      },
    },
    wartay: {
      __doc__: {
        id_001: {
          userId: '001',
          date: '',
          privacy: 'Public',
          publication: 'Primera publicación',
          urlimg: '',
          likes: '',
          planes: '',

          __collection__: {
            SN_Comment: {
              __doc__: {
                cid_001: {
                  userId: '001',
                  pid: 'id_001',
                  date: '',
                  comment: 'new on Travelin',
                },
              },
            },
          },

        },
      },
    },
  },
};

global.firebase = new MockFirebase(fixtureData, { isNaiveSnapshotListenerEnabled: true });
/* const firebasemock = require('firebase-mock');

const mockauth = new firebasemock.MockFirebase();
const mockfirestore = new firebasemock.MockFirestore();
mockfirestore.autoFlush();
mockauth.autoFlush();

global.firebase = firebasemock.MockFirebaseSdk(
  // use null if your code does not use RTDB
  () => null,
  () => mockauth,
  () => mockfirestore,
); */
// Función userData
describe('función userData', () => {
  it('Deberia ser una función', () => {
    expect(typeof userData).toBe('function');
  });
  it('Debería poder iniciar sesion', () => signIn('kelmita22@gmail.com', '123456')
    .then((user) => {
      expect(user.email).toBe('kelmita22@gmail.com');
    }));
});
// Función getUserData
describe('función getUserData', () => {
  it('Deberia ser una función', () => {
    expect(typeof getUserData).toBe('function');
  });
  it('Debería poder iniciar sesion', () => signIn('kelmita22@gmail.com', '123456')
    .then((user) => {
      expect(user.email).toBe('kelmita22@gmail.com');
    }));
});
// Función updateCurrentUser
describe('función updateCurrentUser', () => {
  it('Deberia ser una función', () => {
    expect(typeof updateCurrentUser).toBe('function');
  });
  it('Debería poder iniciar sesion', () => signIn('kelmita22@gmail.com', '123456')
    .then((user) => {
      expect(user.email).toBe('kelmita22@gmail.com');
    }));
});
// Función postAdd
describe('función postAdd', () => {
  it('Deberia ser una función', () => {
    expect(typeof postAdd).toBe('function');
  });
  it('Debería poder iniciar sesion', () => signIn('kelmita22@gmail.com', '123456')
    .then((user) => {
      expect(user.email).toBe('kelmita22@gmail.com');
    }));
});
// Función getPost
describe('función getPost', () => {
  it('Deberia ser una función', () => {
    expect(typeof getPost).toBe('function');
  });
  it('Debería poder iniciar sesion', () => signIn('kelmita22@gmail.com', '123456')
    .then((user) => {
      expect(user.email).toBe('kelmita22@gmail.com');
    }));
});
// Función commentAdd
describe('función commentAdd', () => {
  it('Deberia ser una función', () => {
    expect(typeof commentAdd).toBe('function');
  });
  it('Debería poder iniciar sesion', () => signIn('kelmita22@gmail.com', '123456')
    .then((user) => {
      expect(user.email).toBe('kelmita22@gmail.com');
    }));
});
// Función getComment
describe('función getComment', () => {
  it('Deberia ser una función', () => {
    expect(typeof getComment).toBe('function');
  });
  it('Debería poder iniciar sesion', () => signIn('kelmita22@gmail.com', '123456')
    .then((user) => {
      expect(user.email).toBe('kelmita22@gmail.com');
    }));
});
// Función removePost
describe('función removePost', () => {
  it('Deberia ser una función', () => {
    expect(typeof removePost).toBe('function');
  });
  it('Debería poder iniciar sesion', () => signIn('kelmita22@gmail.com', '123456')
    .then((user) => {
      expect(user.email).toBe('kelmita22@gmail.com');
    }));
});
// Función removeComment
describe('función removeComment', () => {
  it('Deberia ser una función', () => {
    expect(typeof removeComment).toBe('function');
  });
  it('Debería poder iniciar sesion', () => signIn('kelmita22@gmail.com', '123456')
    .then((user) => {
      expect(user.email).toBe('kelmita22@gmail.com');
    }));
});
// Función profilePhoto
describe('función profilePhoto', () => {
  it('Deberia ser una función', () => {
    expect(typeof profilePhoto).toBe('function');
  });
  it('Debería poder iniciar sesion', () => signIn('kelmita22@gmail.com', '123456')
    .then((user) => {
      expect(user.email).toBe('kelmita22@gmail.com');
    }));
});
// Función coveragePhoto
describe('función coveragePhoto', () => {
  it('Deberia ser una función', () => {
    expect(typeof coveragePhoto).toBe('function');
  });
  it('Debería poder iniciar sesion', () => signIn('kelmita22@gmail.com', '123456')
    .then((user) => {
      expect(user.email).toBe('kelmita22@gmail.com');
    }));
});
// Función upgradePost
describe('función upgradePost', () => {
  it('Deberia ser una función', () => {
    expect(typeof upgradePost).toBe('function');
  });
  it('Debería poder iniciar sesion', () => signIn('kelmita22@gmail.com', '123456')
    .then((user) => {
      expect(user.email).toBe('kelmita22@gmail.com');
    }));
});
// Función upgradePost
describe('función upgradeComment', () => {
  it('Deberia ser una función', () => {
    expect(typeof upgradeComment).toBe('function');
  });
  it('Debería poder iniciar sesion', () => signIn('kelmita22@gmail.com', '123456')
    .then((user) => {
      expect(user.email).toBe('kelmita22@gmail.com');
    }));
});
// Función upgradeLike
describe('función upgradeLike', () => {
  it('Deberia ser una función', () => {
    expect(typeof upgradeLike).toBe('function');
  });
  it('Debería poder iniciar sesion', () => signIn('kelmita22@gmail.com', '123456')
    .then((user) => {
      expect(user.email).toBe('kelmita22@gmail.com');
    }));
});
