import {
  photoDescriptions
} from './photo-description.js'

const createPicture = () => {
  const picturesContainer = document.querySelector('.pictures');
  const pictureTemplate = document.querySelector('#picture-template').content.querySelector('.picture');

  const picturesFragmentContainer = document.createDocumentFragment();

  photoDescriptions.forEach(({avatar, likes, comments}) => {
    const newPicture = pictureTemplate.cloneNode(true);
    newPicture.querySelector('img').src = avatar;
    newPicture.querySelector('.picture-likes').textContent = likes;
    newPicture.querySelector('.picture-comments').textContent = comments.length;
    picturesFragmentContainer.appendChild(newPicture);
  });

  picturesContainer.appendChild(picturesFragmentContainer);

};

export {
  createPicture
}
