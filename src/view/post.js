import {
  removePost, upgradePost, commentAdd, getComment, getUserData, upgradeLike,
} from '../js/firestore.js';
import {
  currentUser,
} from '../js/auth.js';
import { itemComment } from './comments.js';

export const itemPost = (objPost) => {
  const userId = firebase.auth().currentUser.uid;
  const counterLikes = objPost.likes.length;
  const boxPost = document.createElement('div');
  boxPost.classList.add('allpost');
  boxPost.innerHTML = `
      <section class="mainpost">
        <section class="user-post">
          <section class="${(userId !== objPost.userId) ? 'hide' : 'show menu-post'}">
            <i class="fas fa-ellipsis-v btn-menu-post"></i>
            <ul id="menu-post-content" class="menu-post-content">
            <li id="edit-post"><i class="fas fa-edit select"></i> Edit</li>
            <li id="delete-post-${objPost.id}"><i class="fas fa-trash-alt select"></i> Delete</li>
            </ul>
          </section>               
            <img class="avatar-post" src=""/>
            <p class="name">
            <span class = "username"></span>
            <span class = "tooltiptext">
            <img class="tooltipimg" src=""/>
            <strong class="nametooltip"></strong> <br>
            <i class="fas fa-birthday-cake"></i> &nbsp <span id="birthdayTooltip"></span><br>
            <i class="fas fa-map-marker-alt"></i> &nbsp <span id="countryTooltip"></span>
            </span></p>
          <select id="privacy-option" class="${(userId === objPost.userId) ? 'show fa' : 'hide'}">
            <option class="fa" value="public" ${(objPost.privacy === 'public') ? 'selected' : ''} title = "Public">&#xf57d; </option>
            <option class="fa" value="private" ${(objPost.privacy === 'private') ? 'selected' : ''} title = "Private">&#xf023; </option>
          </select>
            <p class="time-post">${objPost.date}</p>
          </section>       
          <section class="content-post">
            <p class="text-post">${objPost.publication}</p>
            <section class = "edit-text-post">
            <textarea class="edit-text">${objPost.publication}</textarea>
            <section class = "edit-text-btns">
            <button type="button" class="btn-save-edit-${objPost.id}">Save</button>
          </section>
        </section>
          <img id="post-img" class="post-img" src='${objPost.urlimg}'/>
        <section class="like-comment-container">
          <p id="likes" class="${(counterLikes === 0) ? 'hide' : 'count-like'}" > ${counterLikes} reactions
          </p>
          <p id = "count-comment" class="${(counterLikes === 0) ? 'count-comment' : 'count-comment-right'}"></p>     
          <hr>
          <button type="button" id="btn-like" class="btn-like-plane ${(objPost.likes.indexOf(userId) === -1) ? 'inactive-reaction' : 'active-reaction'}"><i class="fa fa-thumbs-up"></i> Like </button>
          <button type="button" id="btn-comment" class="btn-comment"><i class="fa fa-comment"></i>Comment </button>
        </section>
        <section id ="container-comment" class="hide">
          <form class="div-comment formComment">
          <textarea class="comment" placeholder="Agrega un comentario" required></textarea>
          <button type="submit" class="fas fa-paper-plane"></button>
          </form>
          <section id = "container-AllComment"></div>
      </section>  
    </section>
  </div>
`;
  getUserData(objPost.userId)
    .then((doc) => {
      const avatarPhoto = boxPost.querySelector('.avatar-post');
      const username = boxPost.querySelector('.username');
      const nametooltip = boxPost.querySelector('.nametooltip');
      const tooltipimg = boxPost.querySelector('.tooltipimg');
      avatarPhoto.src = doc.data().photo;
      tooltipimg.src = doc.data().photo;
      username.textContent = doc.data().username;
      nametooltip.textContent = doc.data().username.toUpperCase();
    });

  /* ---------------- Menu despegable --------------------------*/
  const btnMenu = boxPost.querySelector('.btn-menu-post');
  btnMenu.addEventListener('click', () => {
    boxPost.querySelector('#menu-post-content').classList.toggle('show');
  });
  // cerrar con click por fuera
  window.addEventListener('click', (e) => {
    if (e.target !== btnMenu) {
      boxPost.querySelector('#menu-post-content').classList.remove('show');
    }
  });
  /* -------------- editar el menu -------------------*/
  const editPost = boxPost.querySelector('#edit-post');
  const editPublication = boxPost.querySelector('.edit-text');
  const btnSaveEdit = boxPost.querySelector(`.btn-save-edit-${objPost.id}`);
  // const btnCancelEdit = postElement.querySelector('.btn-cancel-edit');
  // editar post
  editPost.addEventListener('click', () => {
    boxPost.querySelector('.edit-text-post').style.display = 'block';
    boxPost.querySelector('.text-post').classList.add('hide');
  });
  // actualizar post
  btnSaveEdit.addEventListener('click', () => {
    upgradePost(objPost.id, editPublication.value);
  });
  // borrar post
  boxPost.querySelector(`#delete-post-${objPost.id}`)
    .addEventListener('click', () => {
      removePost(objPost.id);
    });
  // actualizarlikes
  const likes = boxPost.querySelector('#btn-like');
  likes.addEventListener('click', () => {
    const result = objPost.likes.indexOf(userId);
    if (result === -1) {
      objPost.likes.push(userId);
      upgradeLike(objPost.id, objPost.likes);
    } else {
      objPost.likes.splice(result, 1);
      upgradeLike(objPost.id, objPost.likes);
    }
  });
  /* ------------Mostrar y ocultar comentario ------------------*/
  boxPost.querySelector('#btn-comment').addEventListener('click', () => {
    boxPost.querySelector('#btn-comment').classList.toggle('btn-comment-active');
    boxPost.querySelector('#container-comment').style.display = 'block';
  });

  /* ---------------------- agregar POST al clound------------------*/
  const formComment = boxPost.querySelector('.formComment');
  formComment.addEventListener('submit', (e) => {
    const comment = boxPost.querySelector('.comment').value;
    e.preventDefault();
    commentAdd(currentUser().uid, objPost.id, comment)
      .then(() => {
        formComment.reset();
      });
  });
  /* ---------------------- GET comentarios de container------------------*/
  const containerAllComment = boxPost.querySelector('#container-AllComment');
  const counterComment = boxPost.querySelector('#count-comment');
  getComment(objPost.id, (comment) => {
    containerAllComment.innerHTML = '';
    comment.forEach((objComment) => {
      containerAllComment.appendChild(itemComment(objComment, objPost.id));
    });
    counterComment.textContent = `${(comment.length !== 0) ? `${comment.length} comments` : ''}`;
  });
  return boxPost;
};
