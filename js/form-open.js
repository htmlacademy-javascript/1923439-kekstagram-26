import {isEscapeDown, stopListenerOnFocus} from './util.js';
import {hashtagsField, commentField, userPhotoForm} from './form-validation.js';
import {scaleBigger, scaleSmaller, renderBiggerPhoto, renderSmallerPhoto} from './scale-size-photos.js';
import {onFormChange} from './effects-slider.js';
import {blockSubmitButton} from './form-validation.js';
import {uploadField} from './upload-photo.js';


// Находим форму редактирвоания изображения
const formPhotoEdit = document.querySelector('.img-upload__overlay');

// Находим кнопку закоытия формы редактирования фотографии
const editPopupCLoseButton = document.querySelector('#upload-cancel');


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
  stopListenerOnFocus(hashtagsField, 'keydown');
  stopListenerOnFocus(commentField, 'keydown');
  formPhotoEdit.classList.remove('hidden');
  userPhotoForm.addEventListener('change', onFormChange);
  blockSubmitButton(false, 'Опубликовать');
  document.querySelector('body').classList.add('modal-open');
  scaleBigger.addEventListener('click', renderBiggerPhoto);
  scaleSmaller.addEventListener('click', renderSmallerPhoto);
  editPopupCLoseButton.addEventListener('click', onEditPopupClick);
  document.addEventListener('keydown', onEditPopupEscDown);
}


// функция закрытия попапа редактирования фотографии
function closeEditPhotosPopup () {
  formPhotoEdit.classList.add('hidden');
  document.querySelector('body').classList.remove('modal-open');
  uploadField.value = '';
  userPhotoForm.removeEventListener('change', onFormChange);
  scaleBigger.removeEventListener('click', renderBiggerPhoto);
  scaleSmaller.removeEventListener('click', renderSmallerPhoto);
  editPopupCLoseButton.removeEventListener('click', onEditPopupClick);
  document.removeEventListener('keydown', onEditPopupEscDown);
}

export {closeEditPhotosPopup, openEditPhotosPopup, userPhotoForm};
