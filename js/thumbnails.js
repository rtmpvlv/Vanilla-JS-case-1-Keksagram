const renderUserPhotos = (photoDescriptions) => {
  const picturesContainer = document.querySelector('.pictures');
  const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');

  const picturesFragment = document.createDocumentFragment();

  photoDescriptions.forEach(({avatar, likes, comments}) => {
    const newPicture = pictureTemplate.cloneNode(true);
    newPicture.querySelector('img').src = avatar;
    newPicture.querySelector('.picture__likes').textContent = likes;
    newPicture.querySelector('.picture__comments').textContent = comments.length;
    picturesFragment.appendChild(newPicture);
  });

  picturesContainer.appendChild(picturesFragment);
};

export {
  renderUserPhotos
}
