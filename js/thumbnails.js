/* global _:readonly */

import { getData } from './fetch.js';
import { togglePhotoOverlay } from './to-full.js';
import { getNewRandomArray } from './utils.js';

const RANDOM_FILTER_PHOTOS_QUANTITY = 10;

const picturesContainer = document.querySelector('.pictures');
const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');
const picturesFragment = document.createDocumentFragment();
const defaultFilterButton = document.querySelector('#filter-default');
const randomFilterButton = document.querySelector('#filter-random');
const discussedFilterButton = document.querySelector('#filter-discussed');

const showFiltering = () => {
  const imgFilterSection = document.querySelector('.img-filters');

  imgFilterSection.classList.remove('img-filters--inactive');
}

const renderUserPhotos = (photos) => {

  photos.forEach(({url, likes, comments}) => {
    const newPicture = pictureTemplate.cloneNode(true);
    newPicture.querySelector('img').src = url;
    newPicture.querySelector('.picture__likes').textContent = likes;
    newPicture.querySelector('.picture__comments').textContent = comments.length;
    picturesFragment.appendChild(newPicture);
  });

  picturesContainer.appendChild(picturesFragment);
};

getData((photos) => {
  renderUserPhotos(photos);
  togglePhotoOverlay(photos);
  showFiltering();

  const onDefaultButtonClick = () => {
    picturesContainer.querySelectorAll('a').forEach(item => {
      picturesContainer.removeChild(item);
    });
    renderUserPhotos(photos);
    togglePhotoOverlay(photos);
  };

  defaultFilterButton.addEventListener('click', _.debounce(onDefaultButtonClick, 500));
  defaultFilterButton.addEventListener('click', () => {
    defaultFilterButton.classList.add('img-filters__button--active');
    randomFilterButton.classList.remove('img-filters__button--active');
    discussedFilterButton.classList.remove('img-filters__button--active');
  });

  const onRandomButtonClick = () => {
    picturesContainer.querySelectorAll('a').forEach(item => {
      picturesContainer.removeChild(item);
    });

    const randomArray = getNewRandomArray(photos, RANDOM_FILTER_PHOTOS_QUANTITY);

    renderUserPhotos(randomArray);
    togglePhotoOverlay(randomArray);
  };

  randomFilterButton.addEventListener('click', _.debounce(onRandomButtonClick, 500));
  randomFilterButton.addEventListener('click', () => {
    defaultFilterButton.classList.remove('img-filters__button--active');
    randomFilterButton.classList.add('img-filters__button--active');
    discussedFilterButton.classList.remove('img-filters__button--active');
  });

  const onDiscussedButtonClick = () => {
    const getPhotosCommentsQuantity = (photo) => {
      return photo.comments.length;
    };

    const compareCommentsQuantity = (photo_i, photo_j) => {
      let commentsQuantity_i = getPhotosCommentsQuantity(photo_i);
      let commentsQuantity_j = getPhotosCommentsQuantity(photo_j);

      return commentsQuantity_j - commentsQuantity_i;
    };

    let discussedPhotos = photos.slice().sort(compareCommentsQuantity);

    picturesContainer.querySelectorAll('a').forEach(item => {
      picturesContainer.removeChild(item);
    });

    renderUserPhotos(discussedPhotos);
    togglePhotoOverlay(discussedPhotos);
  };

  discussedFilterButton.addEventListener('click', _.debounce(onDiscussedButtonClick, 500));
  discussedFilterButton.addEventListener('click', () => {
    defaultFilterButton.classList.remove('img-filters__button--active');
    randomFilterButton.classList.remove('img-filters__button--active');
    discussedFilterButton.classList.add('img-filters__button--active');
  });
});

export {
  renderUserPhotos,
  showFiltering
}
