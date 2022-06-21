import { getPhotosArray, USERS_PHOTOS_COUNT, getPhoto } from './data.js';
import { getPositiveRandomInt } from './util.js';

const MIN_MINIATURES_COMMENT = 3;
const MAX_MINIATURES_COMMENT = 20;

const usersMiniaturesContainer = document.querySelector('.pictures');
const usersMiniaturesTemplate = document.querySelector('#picture').content.querySelector('.picture');


const simularMiniatures = getPhotosArray(USERS_PHOTOS_COUNT);
getPhoto();


const simularMiniaturesFragment = document.createDocumentFragment();

simularMiniatures.forEach(({url, likes}) => {
  const usersMiniaturesElement = usersMiniaturesTemplate.cloneNode(true);
  usersMiniaturesContainer.appendChild(usersMiniaturesElement);
  usersMiniaturesElement.querySelector('.picture__img').src = url;
  usersMiniaturesElement.querySelector('.picture__comments').textContent = getPositiveRandomInt(MIN_MINIATURES_COMMENT, MAX_MINIATURES_COMMENT);
  usersMiniaturesElement.querySelector('.picture__likes').textContent = likes;
  simularMiniaturesFragment.appendChild(usersMiniaturesElement);
});

usersMiniaturesContainer.appendChild(simularMiniaturesFragment);
