const setValidation = () => {

  const MAX_DESCRIPTION_LENGTH = 140;
  const MAX_HASHTAG_LENGTH = 20;
  const MAX_HASHTAG_QUANTITY = 5;

  const hashtagInput = document.querySelector('.text__hashtags');
  const descriptionText = document.querySelector('.text__description');
  const uploadSubmitButton = document.querySelector('.img-upload__submit');


  const answerBadValue = (field) => {
    field.style.border = '5px solid #ff7878';
    uploadSubmitButton.disabled = true;
  };

  const answerGoodValue = (field) => {
    field.style.border = 'none';
    field.setCustomValidity('');
    uploadSubmitButton.disabled = false;
  }

  const setValidationOnDescriptionField = (field) => {
    field.addEventListener('input', () => {
      const valueLength = field.value.length;
      if (valueLength > MAX_DESCRIPTION_LENGTH) {
        field.setCustomValidity('Максимальная длина описания превышена на ' + (valueLength - MAX_DESCRIPTION_LENGTH) + ' символов.')
        answerBadValue(field);
      } else {
        answerGoodValue(field);
      }
      field.reportValidity();
    });
  };
  setValidationOnDescriptionField(descriptionText);

  const setValidationOnHashtagField = (field) => {
    field.addEventListener('input', () => {

      const inputValues = field.value.toLowerCase().trim().split(/\s+/);

      if (inputValues.some((item) => item[0] !== '#')) {
        field.setCustomValidity('Напишите хэштэг используя #.');
        answerBadValue(field);
      } else if (inputValues.some((item) => item.match(/[^A-Za-zА-Яа-я0-9#]/))) {
        field.setCustomValidity('Не используйте спецсимволы.');
        answerBadValue(field);
      } else if (inputValues.some((item) => item === '#')) {
        field.setCustomValidity('Введите имя хэштэга.');
        answerBadValue(field);
      } else if (inputValues.some((item) => item.length > MAX_HASHTAG_LENGTH)) {
        field.setCustomValidity(`Максимальная длина хэштэга - ${MAX_HASHTAG_LENGTH} символов.`);
        answerBadValue(field);
      } else if (inputValues.some((item => item.indexOf('#', 1) > 0))) {
        field.setCustomValidity('Хэштэги нужно писать через пробел.');
        answerBadValue(field);
      } else if (inputValues.some((item, i, arr) => arr.indexOf(item, i + 1) >= i + 1)) {
        field.setCustomValidity('Хэш-теги не должны повторяться.');
        answerBadValue(field);
      } else  if (inputValues.length > MAX_HASHTAG_QUANTITY) {
        field.setCustomValidity(`Максимальное число хэштэгов - ${MAX_HASHTAG_QUANTITY}.`);
        answerBadValue(field);
      } else {
        field.setCustomValidity('');
        answerGoodValue(field);
      }
      field.reportValidity();
    });
  };
  setValidationOnHashtagField(hashtagInput);
};

export { setValidation };
