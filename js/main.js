import './data.js';
import {renderUsersMiniatures} from './users_photo_miniatures.js';
import './users_photo_big.js';
import './comments.js';
import {debounce, renderAlertError} from './util.js';
import './form_open.js';
import {setUserFormSubmit, failFormSubmit, successFormSubmit} from './form_validation.js';
import './effects_slider.js';
import './scale_size_photos.js';
import {getData} from './server.js';
import {showSortingFilter, showRandomPhoto, showDefaultPhoto, showDiscussedPhoto} from './sorting_filter.js';
import './upload_photo.js';

const DEBOUNCE_TIMER = 500;
const sortingForm = document.querySelector('.img-filters__form');

// Отрисовываем миниатюры фотографий пользователей
getData((photos) => {
  renderUsersMiniatures(photos);
  sortingForm.addEventListener('click', debounce((evt) => {
    if (evt.target.matches('#filter-default')) {
      showDefaultPhoto(photos);
    } if (evt.target.matches('#filter-random')) {
      showRandomPhoto(photos);
    } if (evt.target.matches('#filter-discussed')) {
      showDiscussedPhoto(photos);
    }
  }, DEBOUNCE_TIMER));
  showSortingFilter();
},
renderAlertError
);

setUserFormSubmit(successFormSubmit, failFormSubmit);
