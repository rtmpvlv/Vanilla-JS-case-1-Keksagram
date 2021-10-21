import { isEscEvent } from './utils.js';
import { initializeSlider } from './slider.js';
import { setValidation } from './validation.js';
import { sendData } from './fetch.js';

const FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

const uploadInput = document.querySelector('#upload-file');
const preview = document.querySelector('.img-upload__preview img');
const uploadOverlayForm = document.querySelector('.img-upload__overlay');
const uploadCancelButton = document.querySelector('#upload-cancel');
const descriptionText = document.querySelector('.text__description');
const hashtagInput = document.querySelector('.text__hashtags');

const scale = document.querySelector('.img-upload__scale');
const smallerButton = scale.querySelector('.scale__control--smaller');
const biggerButton = scale.querySelector('.scale__control--bigger');
const scaleControl = scale.querySelector('.scale__control--value');
const imageUploadPreview = document.querySelector('.img-upload__preview');

initializeSlider();

const uploadFile = () => {

  const escPressed = (evt) => {
    if (isEscEvent(evt)) {
      closeUploadOverlay();
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
    uploadOverlayForm.classList.add('hidden');
    document.body.classList.remove('modal-open');
    document.removeEventListener('keydown', escPressed);
    resetOptions();
  };

  const uploadNewFile = () => {
    uploadInput.addEventListener('change', () => {
      const file = uploadInput.files[0];
      const fileName = file.name.toLowerCase();
      const matches = FILE_TYPES.some((it) => {
        return fileName.endsWith(it);
      });

      if (matches) {
        const reader = new FileReader();

        reader.addEventListener('load', () => {
          preview.src = reader.result;
        });
        reader.readAsDataURL(file);
        openUploadOverlay();
      } else {
        resetOptions();
      }
    });
  };
  uploadNewFile();


  uploadCancelButton.addEventListener('click', () => {
    closeUploadOverlay();
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

    const removeSuccessWindow = () => {
      document.body.removeChild(successMessage);
      document.removeEventListener('click', onClickAndKeydownHandler);
      document.removeEventListener('keydown', onClickAndKeydownHandler);
    };

    const onClickAndKeydownHandler = (evt) => {
      if (evt.target != successMessage.querySelector('.success__inner') || isEscEvent(evt)) {
        removeSuccessWindow();
      }
    };

    document.addEventListener('keydown', onClickAndKeydownHandler);
    document.addEventListener('click', onClickAndKeydownHandler);

    document.body.appendChild(successMessage);
  };

  const manageErrorWindow = () => {
    const errorMessageTemplate = document.querySelector('#error').content.querySelector('.error');
    const errorMessage = errorMessageTemplate.cloneNode(true);

    const removeErrorWindow = () => {
      document.body.removeChild(errorMessage);
      document.removeEventListener('click', onClickAndKeydownHandler);
      document.removeEventListener('keydown', onClickAndKeydownHandler);
    };

    const onClickAndKeydownHandler = (evt) => {
      if (evt.target != errorMessage.querySelector('.error__inner') || isEscEvent(evt)) {
        removeErrorWindow();
      }
    };

    document.addEventListener('keydown', onClickAndKeydownHandler);
    document.addEventListener('click', onClickAndKeydownHandler);

    document.body.appendChild(errorMessage);
  };

  const setUserFormSubmit = () => {
    const uploadForm = document.querySelector('#upload-select-image');

    uploadForm.addEventListener('submit', (evt) => {
      evt.preventDefault();

      sendData(
        () => {
          closeUploadOverlay();
          resetOptions();
          manageSuccessWindow();
        },
        () => {
          closeUploadOverlay();
          resetOptions();
          manageErrorWindow();
        },
        new FormData(evt.target),
      );
    });
  };

  setUserFormSubmit();
};

const rescale = () => {
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
