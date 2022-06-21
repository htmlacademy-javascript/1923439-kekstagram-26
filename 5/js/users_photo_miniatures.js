import { getPhotosArray, USERS_PHOTOS_COUNT, getPhoto } from './data.js';

const usersMiniaturesContainer = document.querySelector('.pictures');
const usersMiniaturesTemplate = document.querySelector('#picture').content.querySelector('.picture');


const simularMiniatures = getPhotosArray(USERS_PHOTOS_COUNT);
getPhoto();


const simularMiniaturesFragment = document.createDocumentFragment();

simularMiniatures.forEach(({url, likes, comments}) => {
  const usersMiniaturesElement = usersMiniaturesTemplate.cloneNode(true);
  usersMiniaturesContainer.appendChild(usersMiniaturesElement);
  usersMiniaturesElement.querySelector('.picture__img').src = url;
  usersMiniaturesElement.querySelector('.picture__comments').textContent = comments.length;
  usersMiniaturesElement.querySelector('.picture__likes').textContent = likes;
  simularMiniaturesFragment.appendChild(usersMiniaturesElement);
});

usersMiniaturesContainer.appendChild(simularMiniaturesFragment);
