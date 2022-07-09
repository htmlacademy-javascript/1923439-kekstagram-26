import {isEscapeDown, stopListenerOnFocus} from './util.js';
import {hashtagsField, commentField, userPhotoForm} from './form_validation.js';
import {scaleBigger, scaleSmaller, biggerPhoto, smallerPhoto} from './scale_size_photos.js';
import {onFormChange} from './effects_slider.js';
import {blockSubmitButton} from './form_validation.js';

// Находим поле в котором будет путь до локальной фотографии пользователя
const uploadFileInput = document.querySelector('#upload-file');

// Находим форму редактирвоания изображения
const formPhotoEdit = document.querySelector('.img-upload__overlay');

// Находим кнопку закоытия формы редактирования фотографии
const editPopupCLoseButton = document.querySelector('#upload-cancel');


// Добавляем обработчик показа формы редактирования изображения
uploadFileInput.addEventListener('change', openEditPhotosPopup);


// функция проверки и закрытия если нажат esc и удаления обработчика
const onEditPopupEscDown = (evt) => {
  if (isEscapeDown(evt)) {
    evt.preventDefault();
    closeEditPhotosPopup();
  }
};

// функция для закрытия и удаления обработчика по клику
const onEditPopupClick = () => {
  closeEditPhotosPopup();
};

// функция открытия попапа редактирования фотографии
function openEditPhotosPopup () {
  stopListenerOnFocus(hashtagsField, commentField);
  formPhotoEdit.classList.remove('hidden');
  userPhotoForm.addEventListener('change', onFormChange);
  blockSubmitButton(false, 'Опубликовать');
  document.querySelector('body').classList.add('modal-open');
  scaleBigger.addEventListener('click', biggerPhoto);
  scaleSmaller.addEventListener('click', smallerPhoto);
  editPopupCLoseButton.addEventListener('click', onEditPopupClick);
  document.addEventListener('keydown', onEditPopupEscDown);
}


// функция закрытия попапа редактирования фотографии
function closeEditPhotosPopup () {
  formPhotoEdit.classList.add('hidden');
  document.querySelector('body').classList.remove('modal-open');
  uploadFileInput.value = '';
  userPhotoForm.removeEventListener('change', onFormChange);
  scaleBigger.removeEventListener('click', biggerPhoto);
  scaleSmaller.removeEventListener('click', smallerPhoto);
  editPopupCLoseButton.removeEventListener('click', onEditPopupClick);
  document.removeEventListener('keydown', onEditPopupEscDown);
}

export {closeEditPhotosPopup, openEditPhotosPopup, userPhotoForm};
