const getRandomInteger = (min, max) => {
  if (max <= min) {
    [min, max] = [max, min];
  } else if (max < 0 || min < 0) {
    return -1;
  }
  return Math.floor(Math.random()*(max + 1 - min) + min);
};

const getRandomArrayElement = (elements) => elements[getRandomInteger(0, elements.length - 1)];

const checkMaxLength = (str, maxLength) => str <= maxLength;

export {
  getRandomInteger,
  getRandomArrayElement,
  checkMaxLength
};
