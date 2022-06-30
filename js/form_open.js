import {isEscapeDown} from './util.js';
import {hushtagsField, commentField} from './form_validation.js';

// Находим поле в котором будет путь до локальной фотографии пользователя
const uploadFileInput = document.querySelector('#upload-file');

// Находим форму редактирвоания изображения
const formPhotoEdit = document.querySelector('.img-upload__overlay');

// Находим кнопку закоытия формы редактирования фотографии
const editPopupCLoseButton = document.querySelector('#upload-cancel');


// Добавляем обработчик показа формы редактирования изображения
uploadFileInput.addEventListener('change', openEditPhotosPopup);

// Остановка обработчика на поле в фокусе
const stopListenerOnFocus = (firstObject, secondObject) => {
  firstObject.addEventListener('keydown', (evt) => {
    evt.stopImmediatePropagation();
  });
  secondObject.addEventListener('keydown', (evt) => {
    evt.stopImmediatePropagation();
  });
};

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
  stopListenerOnFocus(hushtagsField, commentField);
  formPhotoEdit.classList.remove('hidden');
  document.querySelector('body').classList.add('modal-open');
  editPopupCLoseButton.addEventListener('click', onEditPopupClick);
  document.addEventListener('keydown', onEditPopupEscDown);
}

// функция закрытия попапа редактирования фотографии
function closeEditPhotosPopup () {
  formPhotoEdit.classList.add('hidden');
  document.querySelector('body').classList.remove('modal-open');
  uploadFileInput.value = '';
  editPopupCLoseButton.removeEventListener('click', onEditPopupClick);
  document.removeEventListener('keydown', onEditPopupEscDown);
}
