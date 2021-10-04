import { isEscEvent } from './utils.js';
import { getSlider } from './slider.js';

getSlider();

const uploadFile = () => {
  const uploadInput = document.querySelector('#upload-file');
  const uploadOverlayForm = document.querySelector('.img-upload__overlay');
  const uploadCancelButton = document.querySelector('#upload-cancel');

  const escPressed = (evt) => {
    if (isEscEvent(evt)) {
      closeUploadOverlay();
      uploadInput.value = null;
    }
  };

  const openUploadOverlay = () => {
    uploadOverlayForm.classList.remove('hidden');
    document.body.classList.add('modal-open');
    document.addEventListener('keydown', escPressed);
    rescale();
  };

  const closeUploadOverlay = () => {
    uploadOverlayForm.classList.add('hidden');
    document.body.classList.remove('modal-open');
    document.removeEventListener('keydown', escPressed);
  };

  uploadInput.addEventListener('change', () => {
    openUploadOverlay();
  });

  uploadCancelButton.addEventListener('click', () => {
    closeUploadOverlay();
  });
};

const rescale = () => {
  const scale = document.querySelector('.img-upload__scale');
  const smallerButton = scale.querySelector('.scale__control--smaller');
  const biggerButton = scale.querySelector('.scale__control--bigger');
  const scaleControl = scale.querySelector('.scale__control--value');
  const imageUploadPreview = document.querySelector('.img-upload__preview');

  scaleControl.value = '100%';
  let scaleControlValue = parseInt(scaleControl.value) / 100;

  const transformPhoto = (scaleControlValue) => {
    imageUploadPreview.querySelector('img').style.transform = `scale(${scaleControlValue})`;
  };

  transformPhoto(scaleControlValue);

  smallerButton.addEventListener('click', () => {
    if (scaleControlValue > 0.25) {
      scaleControlValue -= 0.25;
    }
    scaleControl.value = scaleControlValue * 100 + '%';
    transformPhoto(scaleControlValue);
  });

  biggerButton.addEventListener('click', () => {
    if (scaleControlValue < 1) {
      scaleControlValue += 0.25;
    }
    scaleControl.value = scaleControlValue * 100 + '%';
    transformPhoto(scaleControlValue);
  });
};

export { uploadFile };
