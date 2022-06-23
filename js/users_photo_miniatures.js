import { getPhotosInfo } from './users_photo_big.js';
const usersMiniaturesContainer = document.querySelector('.pictures');
const usersMiniaturesTemplate = document.querySelector('#picture').content.querySelector('.picture');

const renderUsersMiniatures = (photosArray) => {
  const usersMiniaturesFragment = document.createDocumentFragment();
  photosArray.forEach((photoObject) => {
    const {url, likes, comments} = photoObject;
    const usersMiniaturesElement = usersMiniaturesTemplate.cloneNode(true);
    usersMiniaturesElement.querySelector('.picture__img').src = url;
    usersMiniaturesElement.querySelector('.picture__comments').textContent = comments.length;
    usersMiniaturesElement.querySelector('.picture__likes').textContent = likes;
    usersMiniaturesElement.addEventListener('click', (evt) => {
      evt.preventDefault();
      getPhotosInfo(photoObject);
    });
    usersMiniaturesFragment.appendChild(usersMiniaturesElement);
  });
  usersMiniaturesContainer.appendChild(usersMiniaturesFragment);
};

export {renderUsersMiniatures};
