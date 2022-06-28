import {isEscapeDown, MAX_LENGTH_COMMENT} from './util.js';

// Находим поле в котором будет путь до локальной фотографии пользователя
const uploadFileInput = document.querySelector('#upload-file');

// Находим форму редактирвоания изображения
const formPhotoEdit = document.querySelector('.img-upload__overlay');

// Находим кнопку закоытия формы редактирования фотографии
const editPopupCLoseButton = document.querySelector('#upload-cancel');

// Находим форму для загрузки фотографии пользователем
const userPhotoForm = document.querySelector('.img-upload__form');

// Находим инпут с хэштегами
const hushtagsField = userPhotoForm.querySelector('.text__hashtags');

// Находим инпут с комментариями
const commentField = userPhotoForm.querySelector('.text__description');

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
  formPhotoEdit.classList.remove('hidden');
  document.querySelector('body').classList.add('modal-open');
  editPopupCLoseButton.addEventListener('click', onEditPopupClick);
  document.addEventListener('keydown', onEditPopupEscDown);
}

// функция закрытия попапа редактирования фотографии
function closeEditPhotosPopup () {
  stopListenerOnFocus(hushtagsField, commentField);
  formPhotoEdit.classList.add('hidden');
  document.querySelector('body').classList.remove('modal-open');
  uploadFileInput.value = '';
  editPopupCLoseButton.removeEventListener('click', onEditPopupClick);
  document.removeEventListener('keydown', onEditPopupEscDown);
}

// Создаём Pristine и настройки сообщений об ошибках
const pristine = new Pristine(userPhotoForm, {
  classTo: 'img-upload__field-wrapper',
  errorClass: 'img-upload__field-wrapper--invalid',
  successClass: 'img-upload__field-wrapper--valid',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextTag: 'div',
  errorTextClass: 'img-upload__form__error'
});


// Функция проверки длинны комментария
const checkCommentLength = (commentsValue) => commentsValue.length <= MAX_LENGTH_COMMENT;

checkCommentLength(commentField);

// Функция валидации символики и длинны хэштега
const checkHushtagsSymbol = (hushtagsValue) => {
  const regularHustags = /^#[A-Za-zА-Яа-яЁё0-9]{2,19}$/i;
  return regularHustags.test(hushtagsValue) || hushtagsValue === '';
};

// Функция валидации уникальности и колличества хэштегов
const checkHushtagsUniq = (hushtagsValue) => {
  const hushtagsArray = hushtagsValue.trim().toLowerCase().split(' ');
  const mayArray = new Set(hushtagsArray);
  // console.log(mayArray.size, hushtagsArray.length);
  // console.log(hushtagsValue);
  return mayArray.size === hushtagsArray.length && hushtagsArray.length <= 5;
};

const checkHashtagsLength = (hashtagsLengts) => hashtagsLengts.length >= 2 && hashtagsLengts.length <= 20;

pristine.addValidator(userPhotoForm.querySelector('.text__hashtags'),
  checkHashtagsLength,
  'Хэштег должен быть более 2 символов и не длиннее 20!');

pristine.addValidator(userPhotoForm.querySelector('.text__hashtags'),
  checkHushtagsSymbol,
  'Хэштег должен начинаться с # и разделяться пробелом');

pristine.addValidator(userPhotoForm.querySelector('.text__hashtags'),
  checkHushtagsUniq,
  'Максимум 5 уникальных хэштегов!');

pristine.addValidator(userPhotoForm.querySelector('.text__description'),
  checkCommentLength,
  'Не более 140 символов');

userPhotoForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  pristine.validate();
});

