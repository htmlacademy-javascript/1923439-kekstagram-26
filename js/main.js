import './data.js';
import {renderUsersMiniatures} from './users_photo_miniatures.js';
import './users_photo_big.js';
import './comments.js';
import {renderAlertError} from './util.js';
import './form_open.js';
import {setUserFormSubmit, failFormSubmit, successFormSubmit} from './form_validation.js';
import './effects_slider.js';
import './scale_size_photos.js';
import {getData} from './server.js';
import {onSortingFilter} from './sorting_filter.js';
import './upload_photo.js';


// Отрисовываем миниатюры фотографий пользователей
getData((photos) => {
  renderUsersMiniatures(photos);
  onSortingFilter(photos);
},
renderAlertError
);

setUserFormSubmit(successFormSubmit, failFormSubmit);
