/* global noUiSlider:readonly */

const DEFAULT_EFFECT_LEVEL = 100;

const initializeSlider = () => {
  const effectLevel = document.querySelector('.effect-level__value');
  const sliderElement = document.querySelector('.effect-level__slider');
  const effectItems = document.querySelectorAll('.effects__radio');
  const effectLevelFieldset = document.querySelector('.img-upload__effect-level');
  const imageUploadPreview = document.querySelector('.img-upload__preview');

  effectLevelFieldset.classList.add('hidden');
  let actualTypeOfEffect = 'none';
  let actualTargetValue = 'none';
  effectLevel.value = DEFAULT_EFFECT_LEVEL;

  noUiSlider.create(sliderElement, {
    range: {
      min: 0,
      max: 100,
    },
    start: 100,
    step: 1,
    connect: 'lower',
  });

  const applyEffects = (value) => {
    imageUploadPreview.querySelector('img').className = '';
    if (value !== 'none') {
      imageUploadPreview.querySelector('img').classList.add(`effects__preview--${value}`)
    }
  };

  applyEffects(actualTargetValue);

  const changeEffectLevel = (type, value) => {
    if (type === 'grayscale' || type === 'sepia' || type === 'brightness') {
      imageUploadPreview.querySelector('img').style.filter = `${type}(${value})`;
    } else if (type === 'invert') {
      imageUploadPreview.querySelector('img').style.filter = `${type}(${value}%)`;
    } else if (type === 'blur') {
      imageUploadPreview.querySelector('img').style.filter = `${type}(${value}px)`;
    } else if (type === 'none') {
      imageUploadPreview.querySelector('img').style.filter = 'none';
    }
  };

  effectItems.forEach(item => {
    item.addEventListener('change', (evt) => {
      switch (evt.target.value) {
        case 'none':
          effectLevelFieldset.classList.add('hidden');
          imageUploadPreview.querySelector('img').style.filter = 'none';
          actualTypeOfEffect = 'none';
          applyEffects(evt.target.value);
          break;
        case 'chrome':
          sliderElement.noUiSlider.updateOptions({
            range: {
              min: 0,
              max: 1,
            },
            start: 1,
            step: 0.1,
          });
          actualTypeOfEffect = 'grayscale';
          imageUploadPreview.querySelector('img').style.filter = '';
          applyEffects(evt.target.value);
          effectLevelFieldset.classList.remove('hidden');
          break;
        case 'sepia':
          sliderElement.noUiSlider.updateOptions({
            range: {
              min: 0,
              max: 1,
            },
            start: 1,
            step: 0.1,
          });
          actualTypeOfEffect = 'sepia';
          imageUploadPreview.querySelector('img').style.filter = '';
          applyEffects(evt.target.value);
          effectLevelFieldset.classList.remove('hidden');
          break;
        case 'marvin':
          sliderElement.noUiSlider.updateOptions({
            range: {
              min: 0,
              max: 100,
            },
            start: 100,
            step: 1,
          });
          actualTypeOfEffect = 'invert';
          imageUploadPreview.querySelector('img').style.filter = '';
          applyEffects(evt.target.value);
          effectLevelFieldset.classList.remove('hidden');
          break;
        case 'phobos':
          sliderElement.noUiSlider.updateOptions({
            range: {
              min: 0,
              max: 3,
            },
            start: 3,
            step: 0.1,
          });
          actualTypeOfEffect = 'blur';
          imageUploadPreview.querySelector('img').style.filter = '';
          applyEffects(evt.target.value);
          effectLevelFieldset.classList.remove('hidden');
          break;
        case 'heat':
          sliderElement.noUiSlider.updateOptions({
            range: {
              min: 1,
              max: 3,
            },
            start: 3,
            step: 0.1,
          });
          actualTypeOfEffect = 'brightness';
          imageUploadPreview.querySelector('img').style.filter = '';
          applyEffects(evt.target.value);
          effectLevelFieldset.classList.remove('hidden');
          break;
      }
    });
  });

  sliderElement.noUiSlider.on('update', (_, handle, unencoded) => {
    effectLevel.value = unencoded[handle];
    changeEffectLevel(actualTypeOfEffect, effectLevel.value);
  });

};

export { initializeSlider };
