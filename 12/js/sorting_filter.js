import {shuffleArray, deleteActiveClassFromButton, debounce} from './util.js';
import {renderUsersMiniatures} from './users_photo_miniatures.js';

const MAX_RANDOM_PHOTOS_COUNT = 10;
const DEBOUNCE_TIMER = 500;
const sortingFilter = document.querySelector('.img-filters');
const defaultButton = sortingFilter.querySelector('#filter-default');
const randomButton = sortingFilter.querySelector('#filter-random');
const discussedButton = sortingFilter.querySelector('#filter-discussed');
const sortingButtons = sortingFilter.querySelectorAll('.img-filters__button');

// показываем меню сортировки
const showSortingFIlter = () => {
  sortingFilter.classList.remove('img-filters--inactive');
};

// Функция для сравнения элементов массива
const compareComments = (commentA, commentB) => commentB.comments.length - commentA.comments.length;

// Функция показа рандомных фоток с сервера
const showRandomPhoto = (photos) => {
  randomButton.addEventListener('click', debounce((evt) => {
    deleteActiveClassFromButton(sortingButtons);
    evt.target.classList.add('img-filters__button--active');
    const shuffeledArray = shuffleArray(photos.slice());
    renderUsersMiniatures(shuffeledArray.slice(0, MAX_RANDOM_PHOTOS_COUNT));
  }, DEBOUNCE_TIMER));
};

// Функция показа всех фоток с сервера по умолчанию
const showDefaultPhoto = (photos) => {
  defaultButton.addEventListener('click', debounce((evt) => {
    deleteActiveClassFromButton(sortingButtons);
    evt.target.classList.add('img-filters__button--active');
    renderUsersMiniatures(photos);
  }, DEBOUNCE_TIMER));
};

// Функция показа самых обсуждаемых фоток
const showDiscussedPhoto = (photos) => {
  discussedButton.addEventListener('click', debounce((evt) => {
    deleteActiveClassFromButton(sortingButtons);
    evt.target.classList.add('img-filters__button--active');
    renderUsersMiniatures(photos.slice().sort(compareComments));
  }, DEBOUNCE_TIMER));
};

export {showSortingFIlter, showRandomPhoto, showDefaultPhoto, showDiscussedPhoto, randomButton};
