import { isEscEvent } from './utils.js';

const togglePhotoOverlay = (photos) => {

  const bigPicture = document.querySelector('.big-picture');
  const bigPictureImg = bigPicture.querySelector('.big-picture__img');
  const commentsCounter = bigPicture.querySelector('.social__comment-count');
  const commentsList = document.querySelector('.social__comments');
  const commentsLoaderButton = bigPicture.querySelector('.social__comments-loader');
  const closeButton = bigPicture.querySelector('.big-picture__cancel');
  const picture = document.querySelectorAll('.picture');
  const commentTemplate = document.querySelector('#comment').content.querySelector('.social__comment');

  const closeOverlay = () => {
    bigPicture.classList.add('hidden');
    document.body.classList.remove('modal-open');
    commentsList.innerHTML = '';
    document.removeEventListener('keydown', escPressed);
  };

  closeButton.addEventListener('click', () => {
    closeOverlay();
  });

  const escPressed = (evt) => {
    if (isEscEvent(evt)) {
      closeOverlay();
    }
  };

  for (let i = 0; i < picture.length; i++) {
    picture[i].addEventListener('click', (evt) => {
      evt.preventDefault();

      bigPictureImg.querySelector('img').src = photos[i].url;
      bigPicture.querySelector('.likes-count').textContent = photos[i].likes;
      bigPicture.querySelector('.comments-count').textContent = photos[i].comments.length;
      bigPicture.querySelector('.social__caption').textContent = photos[i].description;

      renderComments(photos[i].comments);

      bigPicture.classList.remove('hidden');
      commentsCounter.classList.add('hidden');
      commentsLoaderButton.classList.add('hidden');
      document.body.classList.add('modal-open');
      document.addEventListener('keydown', escPressed);
    })
  }

  const renderComments = (usersComments) => {

    const commentsListFragment = document.createDocumentFragment();

    usersComments.forEach(item => {
      const userComment = commentTemplate.cloneNode(true);

      userComment.querySelector('.social__picture').src = item.avatar;
      userComment.querySelector('.social__picture').alt = item.name;
      userComment.querySelector('.social__text').textContent = item.message;

      commentsListFragment.appendChild(userComment);
    });
    commentsList.appendChild(commentsListFragment);
  }
};

export { togglePhotoOverlay };
