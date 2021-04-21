import { components } from '../view/index.js';

const changeView = (route) => {
  const container = document.getElementById('container');
  container.innerHTML = '';
  switch (route) {
    case '#/': {
      return container.appendChild(components.home());
    }
    case '#/registrate': {
      return container.appendChild(components.check());
    }

    default:
      return container.appendChild(components.pageError());
  }
};

export { changeView };
