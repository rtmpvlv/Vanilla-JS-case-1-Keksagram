
const openOverlay = (photoDescriptions) => {

  const bigPicture = document.querySelector('.big-picture');
  const bigPictureImg = bigPicture.querySelector('.big-picture__img');
  const closeButton = bigPicture.querySelector('.big-picture__cancel');
  const commentsCounter = bigPicture.querySelector('.social__comment-count');
  const commentsLoaderButton = bigPicture.querySelector('.social__comments-loader');
  const commentsList = document.querySelector('.social__comments');

  const picture = document.querySelectorAll('.picture');

  closeButton.addEventListener('click', () => {
    bigPicture.classList.add('hidden');
    document.body.classList.remove('modal-open');

    commentsList.innerHTML = '';
  });

  for (let i = 0; i < picture.length; i++) {
    picture[i].addEventListener('click', (evt) => {
      evt.preventDefault();

      bigPicture.classList.remove('hidden');
      commentsCounter.classList.add('hidden');
      commentsLoaderButton.classList.add('hidden');
      document.body.classList.add('modal-open');

      bigPictureImg.querySelector('img').src = photoDescriptions[i].avatar;
      bigPicture.querySelector('.likes-count').textContent = photoDescriptions[i].likes;
      bigPicture.querySelector('.comments-count').textContent = photoDescriptions[i].comments.length;
      bigPicture.querySelector('.social__caption').textContent = photoDescriptions[i].description;

      renderComments(photoDescriptions[i].comments);
    })
  }

  const renderComments = (usersComments) => {

    usersComments.forEach(item => {
      const socialComment = document.createElement('li');
      const socialPicture = document.createElement('img');
      const socialText = document.createElement('p');

      socialComment.classList.add('social__comment');

      socialPicture.classList.add('social__picture');
      socialPicture.src = item.avatar;
      socialPicture.alt = item.name;
      socialPicture.width = '35';
      socialPicture.height = '35';

      socialText.classList.add('social__text');
      socialText.textContent = item.message;

      socialComment.appendChild(socialPicture);
      socialComment.appendChild(socialText);
      commentsList.appendChild(socialComment);
    });

  }
};

export { openOverlay };
