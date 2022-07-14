import {shuffleArray, deleteActiveClassFromButton} from './util.js';
import {renderUsersMiniatures} from './users_photo_miniatures.js';

const MAX_RANDOM_PHOTOS_COUNT = 10;
const sortingFilter = document.querySelector('.img-filters');
const defaultButton = sortingFilter.querySelector('#filter-default');
const randomButton = sortingFilter.querySelector('#filter-random');
const discussedButton = sortingFilter.querySelector('#filter-discussed');
const sortingButtons = sortingFilter.querySelectorAll('.img-filters__button');

// показываем меню сортировки
const showSortingFilter = () => {
  sortingFilter.classList.remove('img-filters--inactive');
};

// Функция для сравнения элементов массива
const compareComments = (commentA, commentB) => commentB.comments.length - commentA.comments.length;

// Функция показа рандомных фоток с сервера
const showRandomPhoto = (photos) => {
  deleteActiveClassFromButton(sortingButtons, 'img-filters__button--active');
  randomButton.classList.add('img-filters__button--active');
  const shuffeledArray = shuffleArray(photos.slice());
  renderUsersMiniatures(shuffeledArray.slice(0, MAX_RANDOM_PHOTOS_COUNT));
};

// Функция показа всех фоток с сервера по умолчанию
const showDefaultPhoto = (photos) => {
  deleteActiveClassFromButton(sortingButtons, 'img-filters__button--active');
  defaultButton.classList.add('img-filters__button--active');
  renderUsersMiniatures(photos);
};

// Функция показа самых обсуждаемых фоток
const showDiscussedPhoto = (photos) => {
  deleteActiveClassFromButton(sortingButtons, 'img-filters__button--active');
  discussedButton.classList.add('img-filters__button--active');
  renderUsersMiniatures(photos.slice().sort(compareComments));
};

export {showSortingFilter, showRandomPhoto, showDefaultPhoto, showDiscussedPhoto, randomButton};
