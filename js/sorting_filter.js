import {shuffleArray, deleteActiveClassFromButton} from './util.js';
import {renderUsersMiniatures} from './users_photo_miniatures.js';

const MAX_RANDOM_PHOTOS_COUNT = 10;
const sortingFilter = document.querySelector('.img-filters');
const defaultButton = sortingFilter.querySelector('#filter-default');
const randomButton = sortingFilter.querySelector('#filter-random');
const discussedButton = sortingFilter.querySelector('#filter-discussed');
const sortingButtons = sortingFilter.querySelectorAll('.img-filters__button');


const showSortingFIlter = () => {
  sortingFilter.classList.remove('img-filters--inactive');
};

// Функция для сравнивания элементов массива
const compareComments = (commentA, commentB) => commentB.comments.length - commentA.comments.length;

const showRandomPhoto = (photos) => {
  randomButton.addEventListener('click', (evt) => {
    deleteActiveClassFromButton(sortingButtons);
    evt.target.classList.add('img-filters__button--active');
    const shuffeledArray = shuffleArray(photos.slice());
    renderUsersMiniatures(shuffeledArray.slice(0, MAX_RANDOM_PHOTOS_COUNT));
  });
};

const showDefaultPhoto = (photos) => {
  defaultButton.addEventListener('click', (evt) => {
    deleteActiveClassFromButton(sortingButtons);
    evt.target.classList.add('img-filters__button--active');
    renderUsersMiniatures(photos);
  });
};

const showDiscussedPhoto = (photos) => {
  discussedButton.addEventListener('click', (evt) => {
    deleteActiveClassFromButton(sortingButtons);
    evt.target.classList.add('img-filters__button--active');
    renderUsersMiniatures(photos.slice().sort(compareComments));
  });
};

export {showSortingFIlter, showRandomPhoto, showDefaultPhoto, showDiscussedPhoto, randomButton};
