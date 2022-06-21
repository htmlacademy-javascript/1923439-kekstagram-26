import { getPhoto } from './data';

const usersMiniaturesContainer = document.querySelector('.pictures');
const usersMiniaturesTemplate = document.querySelector('#picture').Content.querySelector('.picture');


const simularMiniatures = getPhoto();

const simularMiniaturesFragment = document.createDocumentFragment();

simularMiniatures.forEach ((src, comments, likes) => {
  const usersMiniaturesElement = usersMiniaturesTemplate.cloneNode(true);
  usersMiniaturesContainer.appendChild(usersMiniaturesElement);
  usersMiniaturesElement.querySelector('.picture__img').src = src;
  usersMiniaturesElement.querySelector('.picture__comments').textContent = comments;
  usersMiniaturesElement.querySelector('.picture__likes').textContent = likes;
  simularMiniaturesFragment.appendChild(usersMiniaturesElement);
});

usersMiniaturesContainer.appendChild(simularMiniaturesFragment);
