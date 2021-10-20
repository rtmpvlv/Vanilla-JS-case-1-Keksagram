import { isEscEvent } from './utils.js';

const bigPicture = document.querySelector('.big-picture');
const bigPictureImg = bigPicture.querySelector('.big-picture__img');
const commentsCounter = bigPicture.querySelector('.social__comment-count');
const commentsList = document.querySelector('.social__comments');
const commentsLoaderButton = bigPicture.querySelector('.social__comments-loader');
const closeButton = bigPicture.querySelector('.big-picture__cancel');
const commentTemplate = document.querySelector('#comment').content.querySelector('.social__comment');

const renderPictureClickHandler = (photo, picture) => {

  const closeOverlay = () => {
    bigPicture.classList.add('hidden');
    document.body.classList.remove('modal-open');
    commentsList.innerHTML = '';
    document.removeEventListener('keydown', escPressed);
    closeButton.addEventListener('click', closeOverlay);
  };

  const escPressed = (evt) => {
    if (isEscEvent(evt)) {
      closeOverlay();
    }
  };

  picture.addEventListener('click', (evt) => {
    evt.preventDefault();

    const {url, likes, comments, description} = photo;

    renderComments(comments);
    bigPictureImg.querySelector('img').src = url;
    bigPicture.querySelector('.likes-count').textContent = likes;
    bigPicture.querySelector('.social__caption').textContent = description;
    bigPicture.classList.remove('hidden');
    document.body.classList.add('modal-open');
    document.addEventListener('keydown', escPressed);
    closeButton.addEventListener('click',closeOverlay);
  });
};

const renderComments = (comments) => {
  commentsLoaderButton.classList.add('hidden');
  let renderedCommentsCounter = 0;

  const rerenderComments = () => {
    renderFiveComments(renderedCommentsCounter);
    if (renderedCommentsCounter >= comments.length) {
      commentsLoaderButton.classList.add('hidden');
      commentsLoaderButton.removeEventListener('click', rerenderComments);
    }
  }

  if (comments.length > 5) {
    commentsLoaderButton.classList.remove('hidden');
    commentsLoaderButton.addEventListener('click', rerenderComments);
  }

  const renderFiveComments = (j) => {
    for (let i = j; i < j + 5; i++) {
      if (comments[i]) {
        const comment = commentTemplate.cloneNode(true);
        comment.querySelector('.social__picture').src = comments[i].avatar;
        comment.querySelector('.social__picture').alt = comments[i].name;
        comment.querySelector('.social__text').textContent = comments[i].message;
        commentsList.appendChild(comment);
        renderedCommentsCounter++;
        commentsCounter.innerText = `${renderedCommentsCounter} из ${comments.length} комментариев`;
      }
    }
  };

  renderFiveComments(0);
};

export {
  renderPictureClickHandler,
  renderComments
};
