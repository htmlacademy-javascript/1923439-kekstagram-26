import {getPhotosArray, USERS_PHOTOS_COUNT} from './data.js';
import {renderUsersMiniatures} from './users_photo_miniatures.js';
import './users_photo_big.js';
import './comments.js';
import './util.js';


// Задаём переменную-хранилище для нашего готового массива с фотографиями
const photosMiniaturesArray = getPhotosArray(USERS_PHOTOS_COUNT);

console.log(photosMiniaturesArray);

// Отрисовываем миниатюры фотографий пользователей
renderUsersMiniatures(photosMiniaturesArray);

// Открываем режим просмотра большой фотографии

