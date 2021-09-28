import {
  getRandomInteger,
  getRandomArrayElement
} from './utils.js'

const PHOTO_DESCRIPTION_COUNT = 25;

const LIKES = {
  MIN: 15,
  MAX: 200,
};

const IDs = {
  MIN: 1,
  MAX: 10000000,
};

const AVATARS = {
  MIN: 1,
  MAX: 6,
};

const Description = [
  'Красиво отдыхаю.',
  'Живу не напрягаясь.',
  'Вместе со своими корешами.',
  'На море сегодня солнечно.',
  'Как хочется сейчас оказаться с вами.',
  'Вырастил огромные огурцы на дачном участке.',
  'Неделя в больнице пролетела незаметно.',
  'Покупал в прошлом году такие арбузы. Выглядели очень вкусно.',
  'Сколько раз здесь проезжал - никогда не замечал этой красоты.',
  'Жаль, что отпуск заканчивается.',
  'Такая вкуснятина.',
  'Помогите своим родственникам собрать урожай.',
];

const Messages = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!',
];

const Commentators = [
  'Толя Карманов',
  'Коля Красивый',
  'Анна Козырева',
  'Анна Иванова',
  'Илья Карамазов',
  'Илья Ровный',
  'Олег Балаболов',
  'Игорь Крутой',
  'Ольга Иванова',
  'Татьяна Смирнова',
  'Олег Иванов',
  'Олег Киньков',
];

const getRandomComment = () => {
  const comment = {
    id: getRandomInteger(IDs.MIN, IDs.MAX),
    avatar: 'img/avatar-' + getRandomInteger(AVATARS.MIN, AVATARS.MAX) + '.svg',
    message: getRandomArrayElement(Messages),
    name: getRandomArrayElement(Commentators),
  }
  return comment;
};

const getComments = () => {
  let comments = [];
  for (let i = 1; i <= getRandomInteger(1, 10); i ++) {
    comments.push(getRandomComment());
  }
  return comments;
};

const photoDescriptions = [];

const getPhotoDescription = () => {
  for (let i = 1; i <= PHOTO_DESCRIPTION_COUNT; i++) {
    photoDescriptions.push({
      id: i,
      avatar: 'photos/' + i + '.jpg',
      description: getRandomArrayElement(Description),
      likes: getRandomInteger(LIKES.MIN, LIKES.MAX),
      comments: getComments(),
    });
  }
};

export {
  photoDescriptions,
  getPhotoDescription
}
