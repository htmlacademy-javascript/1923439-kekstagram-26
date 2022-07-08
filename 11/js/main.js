import './data.js';
import {renderUsersMiniatures} from './users_photo_miniatures.js';
import './users_photo_big.js';
import './comments.js';
import {renderAlertError} from './util.js';
import {closeEditPhotosPopup} from './form_open.js';
import {setUserFormSubmit} from './form_validation.js';
import './effects_slider.js';
import './scale_size_photos.js';
import {getData} from './server.js';

// Отрисовываем миниатюры фотографий пользователей
getData((photos) => {
  renderUsersMiniatures(photos);
},
renderAlertError
);

setUserFormSubmit(closeEditPhotosPopup);
