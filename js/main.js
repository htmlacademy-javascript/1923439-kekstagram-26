import {getPhotosArray, USERS_PHOTOS_COUNT} from './data.js';
import {renderUsersMiniatures} from './users_photo_miniatures.js';
import './users_photo_big.js';
import './comments.js';
import './util.js';
import './form_open.js';
import './form_validation.js';
import './slider.js';
import './scale_size_photos.js';


// Задаём переменную-хранилище для нашего готового массива с фотографиями
const photosMiniaturesArray = getPhotosArray(USERS_PHOTOS_COUNT);

// console.log(photosMiniaturesArray);

// Отрисовываем миниатюры фотографий пользователей
renderUsersMiniatures(photosMiniaturesArray);

export {photosMiniaturesArray};
