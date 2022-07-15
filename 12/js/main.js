import './data.js';
import {renderUsersMiniatures} from './users_photo_miniatures.js';
import './users_photo_big.js';
import './comments.js';
import {renderAlertError, deleteActiveClassFromButton} from './util.js';
import './form_open.js';
import {setUserFormSubmit, failFormSubmit, successFormSubmit} from './form_validation.js';
import './effects_slider.js';
import './scale_size_photos.js';
import {getData} from './server.js';
import {showSortingFilter, showRandomPhoto, showDefaultPhoto, showDiscussedPhoto, sortingButtons} from './sorting_filter.js';
import './upload_photo.js';

const sortingForm = document.querySelector('.img-filters__form');

// Отрисовываем миниатюры фотографий пользователей
getData((photos) => {
  renderUsersMiniatures(photos);
  sortingForm.addEventListener('click', (evt) => {
    if (evt.target.matches('#filter-default')) {
      deleteActiveClassFromButton(sortingButtons, 'img-filters__button--active');
      evt.target.classList.add('img-filters__button--active');
      showDefaultPhoto(photos);
    } if (evt.target.matches('#filter-random')) {
      deleteActiveClassFromButton(sortingButtons, 'img-filters__button--active');
      evt.target.classList.add('img-filters__button--active');
      showRandomPhoto(photos);
    } if (evt.target.matches('#filter-discussed')) {
      deleteActiveClassFromButton(sortingButtons, 'img-filters__button--active');
      evt.target.classList.add('img-filters__button--active');
      showDiscussedPhoto(photos);
    }
    // switch (evt.target.id) {
    //   case '#filter-default':
    //     showDefaultPhoto(photos);
    //     break;
    //   case '#filter-random':
    //     showRandomPhoto(photos);
    //     break;
    //   case '#filter-discussed':
    //     showDiscussedPhoto(photos);
    //     break;
    // }
  });
  showSortingFilter();
},
renderAlertError
);

setUserFormSubmit(successFormSubmit, failFormSubmit);
