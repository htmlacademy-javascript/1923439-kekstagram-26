import {getPhotosArray, USERS_PHOTOS_COUNT} from './data.js';
import {getUsersMiniatures} from './users_photo_miniatures.js';
import './users_photo_big.js';
import {checksLength, MAX_LENGTH_COMMENT} from './util.js';
import './comments.js';
import './util.js';


checksLength('Я бы не стал таким заниматься', MAX_LENGTH_COMMENT);

// Задаём переменную-хранилище для нашего готового массива с фотографиями
const photosMiniaturesArray = getPhotosArray(USERS_PHOTOS_COUNT);

// Отрисовываем миниатюры фотографий пользователей
getUsersMiniatures(photosMiniaturesArray);


// !!!!!! Временное подключение !!!!!!!!

// Находим коллекцию сгенерированных миниатюр
const miniPhotos = document.querySelectorAll('.picture');

// Находим секцию детального просмотра фотографий
const bigPictureSection = document.querySelector('.big-picture');

// Находим кнопку закрытия окна просмотра большой фотографии
const bigPictureClose = bigPictureSection.querySelector('.big-picture__cancel');

// Функция закрывающая окно просмотра большой фотографии кнопкой 'Esc'
const getCloseBigPictureKeyBoard = () => {
  document.addEventListener('keydown', (evt) => {
    if (evt.keyCode === 27) {
      bigPictureSection.classList.add('hidden');
    }
  });
};

// Функция закрывающая окно просмотра большой фотографии  кликом по кнопке закрытия
const getCloseBigPictureClick = () => {
  bigPictureClose.addEventListener('click', () => {
    bigPictureSection.classList.add('hidden');
  });
};


// Функция для выделения одной миниатюры из массива и открытия окна просмотра большой фотографии
const getOpenBigPhoto = () => {
  for (const miniPhoto of miniPhotos) {
    miniPhoto.addEventListener('click', (evt) => {
      evt.preventDefault();
      bigPictureSection.classList.remove('hidden');
      getCloseBigPictureKeyBoard();
      getCloseBigPictureClick();
    });
  }
};

getOpenBigPhoto();
