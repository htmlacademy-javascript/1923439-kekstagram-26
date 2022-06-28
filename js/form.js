import {isEscapeDown, MAX_LENGTH_COMMENT} from './util.js';

// Находим поле в котором будет путь до локальной фотографии пользователя
const uploadFileInput = document.querySelector('#upload-file');

// Находим форму редактирвоания изображения
const formPhotoEdit = document.querySelector('.img-upload__overlay');

// Находим кнопку закоытия формы редактирования фотографии
const editPopupCLoseButton = document.querySelector('#upload-cancel');

// Находим форму для загрузки фотографии пользователем
const userPhotoForm = document.querySelector('.img-upload__form');

// Находим значение инпута с хэштегами
const hushtagsFieldValue = userPhotoForm.querySelector('.text__hashtags').value;

// Находим инпут с хэштегами
const hushtagsField = userPhotoForm.querySelector('.text__hashtags');

// Находим инпут с комментариями
const commentField = userPhotoForm.querySelector('.text__description');


// Добавляем обработчик показа формы редактирования изображения
uploadFileInput.addEventListener('change', openEditPhotosPopap);

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
function openEditPhotosPopap () {
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
  errorTextTag: 'span',
  errorTextClass: 'img-upload__form__error'
});


// Функция проверки длинны комментария
const checkCommentLength = (commentsValue) => commentsValue.length <= MAX_LENGTH_COMMENT;

// Функция валидации символики и длинны хэштега
const checkHushtagsLength = (hushtagsValue) => {
  const regularHustags = /^#[A-Za-zА-Яа-яЁё0-9]{2,19}$/i;
  return regularHustags.test(hushtagsValue) || hushtagsValue === ' ';
};

// Функция валидации уникальности и колличества хэштегов
const checkHushtagsUniq = (hushtagsValue) => {
  const regularHustags = /^#[A-Za-zА-Яа-яЁё0-9]{2,19}(\s#[A-Za-zА-Яа-яЁё0-9]{2,19}){0,4}$/i;
  const hushtagsArray = hushtagsValue.split(' ');
  const unicArray = new Set(hushtagsArray);
  return unicArray.size === hushtagsArray.length && regularHustags.test(hushtagsValue);
};

checkHushtagsUniq(hushtagsFieldValue);

pristine.addValidator(userPhotoForm.querySelector('.text__hashtags',
  checkHushtagsLength,
  'Хэштеги должен быть не длиннее 20 символов, начинаться с # и разделяться пробелом'));

pristine.addValidator(userPhotoForm.querySelector('.text__hashtags',
  checkHushtagsUniq,
  'максимум 5 уникальных хэштегов!'));

pristine.addValidator(userPhotoForm.querySelector('.text__description',
  checkCommentLength,
  'Не более 140 символов'));

userPhotoForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  pristine.validate();
//   // const usersHushtagsField = userPhotoForm.querySelector('.text__hashtags').value;
//   // const regularHustags = /^#[A-Za-zА-Яа-яЁё0-9]{2,19}(\s#[A-Za-zА-Яа-яЁё0-9]{2,19}){0,4}$/i;
//   // const isValid = pristine.validate();
//   // if (isValid && regularHustags.test(usersHushtagsField) || usersHushtagsField === '') {
//   //   console.log ('good form');
//   // } else {
//   //   console.log('invalid form');
//   // }
});

