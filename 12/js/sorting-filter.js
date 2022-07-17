import {shuffleArray, debounce, deleteActiveClassFromButton} from './util.js';
import './users-photo-miniatures.js';
import {renderUsersMiniatures} from './users-photo-miniatures.js';

const MAX_RANDOM_PHOTOS_COUNT = 10;
const DEBOUNCE_TIMER = 500;
const FILTERS_TYPE = {
  default: 'filter-default',
  random: 'filter-random',
  discussed: 'filter-discussed',
};
const sortingFilter = document.querySelector('.img-filters');
const randomButton = sortingFilter.querySelector('#filter-random');
const sortingButtons = sortingFilter.querySelectorAll('.img-filters__button');
const sortingForm = document.querySelector('.img-filters__form');

// показываем меню сортировки
const showSortingFilter = () => {
  sortingFilter.classList.remove('img-filters--inactive');
};

// Функция для сравнения элементов массива
const compareComments = (commentA, commentB) => commentB.comments.length - commentA.comments.length;

// Функция показа рандомных фоток с сервера
const showRandomPhoto = (photos) => {
  const shuffeledArray = shuffleArray(photos.slice());
  renderUsersMiniatures(shuffeledArray.slice(0, MAX_RANDOM_PHOTOS_COUNT));
};

// Функция показа всех фоток с сервера по умолчанию
const showDefaultPhoto = debounce((photos) => renderUsersMiniatures(photos), DEBOUNCE_TIMER);

// Функция показа самых обсуждаемых фоток
const showDiscussedPhoto = debounce((photos) => renderUsersMiniatures(photos.slice().sort(compareComments)), DEBOUNCE_TIMER);

// Функция применения фильтров
const showFilters = (photos, id) => {
  switch (id) {
    case FILTERS_TYPE.default:
      showDefaultPhoto(photos);
      break;
    case FILTERS_TYPE.random:
      showRandomPhoto(photos);
      break;
    case FILTERS_TYPE.discussed:
      showDiscussedPhoto(photos);
      break;
  }
};

// Функция дебаунса фильтров и отрисовки
const showFiltersDebounced = debounce(showFilters, DEBOUNCE_TIMER);

// Функция активации сортировки фотографий
const onSortingFilter = (photos) => {
  sortingForm.addEventListener('click', (evt) => {
    showFiltersDebounced(photos, evt.target.id);
    deleteActiveClassFromButton(sortingButtons, 'img-filters__button--active');
    evt.target.classList.add('img-filters__button--active');
  });
  showSortingFilter();
};

export {showSortingFilter, showRandomPhoto, showDefaultPhoto, showDiscussedPhoto, randomButton, sortingButtons, showFiltersDebounced, onSortingFilter};
