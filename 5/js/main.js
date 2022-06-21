import {getPhotosArray, USERS_PHOTOS_COUNT} from './data.js';
import {checksLength, MAX_LENGTH_COMMENT} from './util.js';
import './comments.js';
import './util.js';
import './users_photo_miniatures.js';

checksLength('Я бы не стал таким заниматься', MAX_LENGTH_COMMENT);
getPhotosArray(USERS_PHOTOS_COUNT);
