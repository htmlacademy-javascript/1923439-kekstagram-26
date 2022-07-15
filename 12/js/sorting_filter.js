import {shuffleArray, debounce} from './util.js';
import './users_photo_miniatures.js';
import { renderUsersMiniatures } from './users_photo_miniatures.js';

const MAX_RANDOM_PHOTOS_COUNT = 10;
const DEBOUNCE_TIMER = 1500;
const sortingFilter = document.querySelector('.img-filters');
const randomButton = sortingFilter.querySelector('#filter-random');
const sortingButtons = sortingFilter.querySelectorAll('.img-filters__button');

// показываем меню сортировки
const showSortingFilter = () => {
  sortingFilter.classList.remove('img-filters--inactive');
};

// Функция для сравнения элементов массива
const compareComments = (commentA, commentB) => commentB.comments.length - commentA.comments.length;

// Функция показа рандомных фоток с сервера
const showRandomPhoto = debounce((photos) => {
  const shuffeledArray = shuffleArray(photos.slice());
  renderUsersMiniatures(shuffeledArray.slice(0, MAX_RANDOM_PHOTOS_COUNT));
}, DEBOUNCE_TIMER);

// Функция показа всех фоток с сервера по умолчанию
const showDefaultPhoto = debounce((photos) => renderUsersMiniatures(photos), DEBOUNCE_TIMER);

// Функция показа самых обсуждаемых фоток
const showDiscussedPhoto = debounce((photos) => renderUsersMiniatures(photos.slice().sort(compareComments)), DEBOUNCE_TIMER);

export {showSortingFilter, showRandomPhoto, showDefaultPhoto, showDiscussedPhoto, randomButton, sortingButtons};
