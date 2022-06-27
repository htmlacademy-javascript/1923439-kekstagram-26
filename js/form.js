import {isEscapeDown} from './util.js';

// Находим поле в котором будет путь до локальной фотографии пользователя
const uploadFileInput = document.querySelector('#upload-file');

// Находим форму редактирвоания изображения
const formPhotoEdit = document.querySelector('.img-upload__overlay');

// Находим кнопку закоытия формы редактирования фотографии
const editPopupCLoseButton = document.querySelector('#upload-cancel');

// Находим форму для загрузки фотографии пользователем
const userPhotoForm = document.querySelector('.img-upload__form');


// Добавляем обработчик показа формы редактирования изображения
uploadFileInput.addEventListener('change', openEditPhotosPopap);

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
function openEditPhotosPopap () {
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

// const pristine = new Pristine(userPhotoForm, {
//   classTo: 'text__hashtags',
//   errorTextParent: 'text__hashtags',
//   errorTextCLass: 'text__hashtags-error-text',
// });

// ^#[A-Za-zА-Яа-яЁё0-9]{1,19}$

// userPhotoForm.addEventListener('submit', (evt) => {
//   evt.preventDefault();
//   const isValid = pristine.validate();
//   if (isValid) {
//     console.log ('good form');
//   }
// });
