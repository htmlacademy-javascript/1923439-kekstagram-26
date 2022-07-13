import { openBigPicture } from './users_photo_big.js';
const usersMiniaturesContainer = document.querySelector('.pictures');
const usersMiniaturesTemplate = document.querySelector('#picture').content.querySelector('.picture');

// Функция для отрисовки миниатюр фотографий пользователей и замыкание на синхронизацию с большими фотографиями
const renderUsersMiniatures = (photosArray) => {
  const usersMiniaturesFragment = document.createDocumentFragment();
  document.querySelectorAll('.picture').forEach((element) => element.remove());
  photosArray.forEach((photoObject) => {
    const usersMiniaturesElement = usersMiniaturesTemplate.cloneNode(true);
    const {url, likes, comments} = photoObject;
    usersMiniaturesElement.querySelector('.picture__img').src = url;
    usersMiniaturesElement.querySelector('.picture__comments').textContent = comments.length;
    usersMiniaturesElement.querySelector('.picture__likes').textContent = likes;
    usersMiniaturesElement.addEventListener('click', (evt) => {
      evt.preventDefault();
      openBigPicture(photoObject);
    });
    usersMiniaturesFragment.appendChild(usersMiniaturesElement);
  });
  usersMiniaturesContainer.appendChild(usersMiniaturesFragment);
};

export {renderUsersMiniatures, usersMiniaturesContainer};
