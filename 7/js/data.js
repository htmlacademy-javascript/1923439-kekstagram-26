import {getRandomArrayElement, getPositiveRandomInt, MAX_COUNT} from './util.js';
import { getMultiComments } from './comments.js';

// Данные известные заранее
const USERS_PHOTOS_COUNT = 25;
const MIN_LIKES = 15;
const MULTICOMENTS_MIN_COUNT = 1;
const MULTICOMENTS_MAX_COUNT = 15;

// Описание фоток
const DESCRIPTIONS = [
  'Упал лицом на кнопку "снять"',
  'Моя Мама говорит мне, что у меня есть талант',
  'Продаётся снимок - дорого',
  'За эту разработку мне такую премию дадут...',
  'Чисто жиза!'
];

// Функция для создания объекта фотографий пользователей
const getPhoto = (counter) => {
  const userPhoto = {
    id: counter,
    url: `photos/${counter}.jpg` ,
    description: getRandomArrayElement(DESCRIPTIONS),
    likes: getPositiveRandomInt(MIN_LIKES, MAX_COUNT),
    comments: getMultiComments(getPositiveRandomInt(MULTICOMENTS_MIN_COUNT, MULTICOMENTS_MAX_COUNT))
  };
  return userPhoto;
};

// Массив объектов с фотографиями пользователей
const getPhotosArray = (photosCount) => {
  const photosArray = [];
  for (let i = 1; i <= photosCount; i++) {
    photosArray.push(getPhoto(i));
  }
  return photosArray;
};

export {getPhotosArray, USERS_PHOTOS_COUNT};
