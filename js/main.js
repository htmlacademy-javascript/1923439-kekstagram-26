import {renderUsersMiniatures} from './users-photo-miniatures.js';
import './users-photo-big.js';
import {renderAlertError} from './util.js';
import './form-open.js';
import {setUserFormSubmit, renderFailFormSubmit, renderSuccessFormSubmit} from './form-validation.js';
import './effects-slider.js';
import './scale-size-photos.js';
import {getData} from './server.js';
import {onSortingFilter} from './sorting-filter.js';
import './upload-photo.js';


// Отрисовываем миниатюры фотографий пользователей
getData((photos) => {
  renderUsersMiniatures(photos);
  onSortingFilter(photos);
},
renderAlertError
);

setUserFormSubmit(renderSuccessFormSubmit, renderFailFormSubmit);
