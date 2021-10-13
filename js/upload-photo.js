import { isEscEvent } from './utils.js';
import { initializeSlider } from './slider.js';
import { setValidation } from './validation.js';
import { sendData } from './fetch.js';

initializeSlider();

const uploadFile = () => {
  const uploadInput = document.querySelector('#upload-file');
  const uploadOverlayForm = document.querySelector('.img-upload__overlay');
  const uploadCancelButton = document.querySelector('#upload-cancel');
  const descriptionText = document.querySelector('.text__description');
  const hashtagInput = document.querySelector('.text__hashtags');

  const escPressed = (evt) => {
    if (isEscEvent(evt)) {
      closeUploadOverlay();
      resetOptions();
    }
  };

  const exceptEscPressed = (element) => {
    element.onfocus = () => {
      document.removeEventListener('keydown', escPressed);
    }
    element.onblur = () => {
      document.addEventListener('keydown', escPressed);
    }
  };

  exceptEscPressed(hashtagInput);
  exceptEscPressed(descriptionText);

  const openUploadOverlay = () => {
    rescale();
    setValidation();
    uploadOverlayForm.classList.remove('hidden');
    document.body.classList.add('modal-open');
    document.addEventListener('keydown', escPressed);
  };

  const closeUploadOverlay = () => {
    uploadInput.value = null;
    uploadOverlayForm.classList.add('hidden');
    document.body.classList.remove('modal-open');
    document.removeEventListener('keydown', escPressed);
  };

  uploadInput.addEventListener('change', () => {
    openUploadOverlay();
  });

  uploadCancelButton.addEventListener('click', () => {
    closeUploadOverlay();
    resetOptions();
  });

  const resetOptions = () => {
    document.querySelector('.img-upload__preview img').style.transform = 1;
    document.querySelector('.img-upload__preview img').className = '';
    document.querySelector('.img-upload__preview img').style.filter = 'none';
    document.querySelector('.img-upload__effect-level').classList.add('hidden');
    document.querySelector('.effects__radio:first-child').checked = 'true';
    uploadInput.value = null;
    descriptionText.value = null;
    hashtagInput.value = null;
  };

  const manageSuccessWindow = () => {
    const successMessageTemplate = document.querySelector('#success').content.querySelector('.success');
    const successMessage = successMessageTemplate.cloneNode(true);
    // const successButton = successMessage.querySelector('.success__button');

    const removeSuccessWindow = () => {
      document.body.removeChild(successMessage);
    };

    const escPressedWithSuccessWindow = (evt) => {
      if (isEscEvent(evt)) {
        removeSuccessWindow();
      }
    };

    document.addEventListener('keydown', escPressedWithSuccessWindow);
    document.addEventListener('click', removeSuccessWindow);

    document.body.appendChild(successMessage);
  };

  const manageErrorWindow = () => {
    const errorMessageTemplate = document.querySelector('#error').content.querySelector('.error');
    const errorMessage = errorMessageTemplate.cloneNode(true);
    // const errorButton = errorMessage.querySelector('.error__button');

    const removeErrorWindow = () => {
      document.body.removeChild(errorMessage);
    };

    const escPressedWithSuccessWindow = (evt) => {
      if (isEscEvent(evt)) {
        removeErrorWindow();
      }
    };

    document.addEventListener('keydown', escPressedWithSuccessWindow);
    document.addEventListener('click', removeErrorWindow);

    document.body.appendChild(errorMessage);
  };

  const isSuccessfulUpload = () => {
    closeUploadOverlay();
    resetOptions();
    manageSuccessWindow();
  };

  const isUnseccessfulUpload = () => {
    closeUploadOverlay();
    resetOptions();
    manageErrorWindow();
  }

  const setUserFormSubmit = () => {
    const uploadForm = document.querySelector('#upload-select-image');

    uploadForm.addEventListener('submit', (evt) => {
      evt.preventDefault();

      sendData(
        () => isSuccessfulUpload(),
        () => isUnseccessfulUpload(),
        new FormData(evt.target),
      );
    });
  };

  setUserFormSubmit();
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

export {
  uploadFile
};
