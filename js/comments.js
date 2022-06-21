import { getPositiveRandomInt, getRandomArrayElement, getOrderUnicArray, shuffleArray, MAX_COUNT } from './util.js';

const MIN_AVATAR_COUNT = 1;
const MAX_AVATAR_COUNT = 6;
const RANDOM_COMMENT_MIN_COUNT = 1;
const RANDOM_COMMENT_MAX_COUNT = 2;

// Данные придуманные мной
const NAMES_AUTHORS = [
  'Иван',
  'Платон',
  'Евлампий',
  'Ухтын',
  'Бурдюк',
  'Патап',
  'Алёшка',
  'Милена',
  'Даздраперма',
  'Аглая',
  'Фёкла',
  'Галя',
  'Зина'
];

const COMMENTS = [
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'В целом всё неплохо. Но не всё.'
];

// Функция для генерации случайного комментария
const getRandomComment = () => {
  let randomComment;
  randomComment = COMMENTS[getPositiveRandomInt(0, COMMENTS.length - 1)];
  if (getPositiveRandomInt(RANDOM_COMMENT_MIN_COUNT, RANDOM_COMMENT_MAX_COUNT) > RANDOM_COMMENT_MIN_COUNT) {
    randomComment += ` ${  COMMENTS[getPositiveRandomInt(0, COMMENTS.length - 1)]}`;
  }
  return randomComment;
};

// Записываем массив ID комментариев в переменную и перемешиваем его
const ordererUnicArray = getOrderUnicArray(MAX_COUNT);
shuffleArray(ordererUnicArray);

// Функция для создания массива с комментариями
const getMultiComments = (commentsCounter) => {
  const userComments = [];
  for (let i = 0; i < commentsCounter; i++) {
    userComments[i] = {
      id: ordererUnicArray.shift(),
      avatar: `img/avatar-${getPositiveRandomInt(MIN_AVATAR_COUNT, MAX_AVATAR_COUNT)}.svg`,
      message: getRandomComment(),
      name: getRandomArrayElement(NAMES_AUTHORS)
    };
  }
  return userComments;
};

export {getMultiComments, getRandomComment, RANDOM_COMMENT_MIN_COUNT, RANDOM_COMMENT_MAX_COUNT};
