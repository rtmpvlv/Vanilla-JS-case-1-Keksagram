const getRandomInteger = (min, max) => {
  if (max <= min) {
    [min, max] = [max, min];
  } else if (max < 0 || min < 0) {
    return -1;
  }
  return Math.floor(Math.random()*(max + 1 - min) + min);
};

const getRandomArrayElement = (elements) => elements[getRandomInteger(0, elements.length - 1)];

const getNewRandomArray = (array, length) => {
  const newArray = array.slice();
  for (let i = newArray.length - 1; i > 0; i--) {
    let j = getRandomInteger(0, i);
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  newArray.length = length;
  return newArray;
};

const checkMaxLength = (str, maxLength) => str <= maxLength;

const isEscEvent = (evt) => {
  return evt.key === 'Escape' || evt.key === 'Esc';
};

const showAlert = (message) => {
  const ALERT_SHOW_TIME = 3000;

  const alertContainer = document.createElement('div');
  alertContainer.style.zIndex = 100;
  alertContainer.style.position = 'absolute';
  alertContainer.style.left = 0;
  alertContainer.style.top = 0;
  alertContainer.style.right = 0;
  alertContainer.style.padding = '5px';
  alertContainer.style.fontSize = '12px';
  alertContainer.style.textAlign = 'center';
  alertContainer.style.backgroundColor = 'red';

  alertContainer.textContent = message;

  document.body.append(alertContainer);

  setTimeout(() => {
    alertContainer.remove();
  }, ALERT_SHOW_TIME);
};

export {
  getRandomInteger,
  getRandomArrayElement,
  getNewRandomArray,
  checkMaxLength,
  isEscEvent,
  showAlert
};
