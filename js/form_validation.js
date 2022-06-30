import { MAX_LENGTH_COMMENT } from './util.js';

// Максимальное количество хэштегов
const MAX_HASHTAGS_COUNT = 5;

// Минимальное количество символов в хэштеге
const MIN_HASHTAGS_LENGTH = 2;

// Максимальное количество символов в хэштеге
const MAX_HASHTAGS_LENGTH = 2;

// Находим форму для загрузки фотографии пользователем
const userPhotoForm = document.querySelector('.img-upload__form');

// Находим инпут с хэштегами
const hushtagsField = userPhotoForm.querySelector('.text__hashtags');

// Находим инпут с комментариями
const commentField = userPhotoForm.querySelector('.text__description');

// Регулярка для проверки Символов
const regHashtagSymbol = /^#[A-Za-zА-Яа-яЁё0-9]{0,100}(\s#[A-Za-zА-Яа-яЁё0-9]{0,100}){0,20}$/i;

// Регулярка для проверки наличия # в начале хэштега
const regHashtagStart = /^#[A-Za-zА-Яа-яЁё0-9]{0,200}(\s#[A-Za-zА-Яа-яЁё0-9]{0,200}){0,20}$/i;

// Регулярка для проверки длины хэштега
const regHashtagLength = /^#[A-Za-zА-Яа-яЁё0-9]{2,19}(\s#[A-Za-zА-Яа-яЁё0-9]{2,19}){0,20}$/i;


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

// Функция валидации символики
const checkHushtagsSymbol = (hushtagsValue) => {
  const regularHustags = regHashtagSymbol;
  return regularHustags.test(hushtagsValue) || hushtagsValue === '';
};

// Функция валидации наличия #
const checkHushtagsStart = (hushtagsValue) => {
  const regularHustags = regHashtagStart;
  return regularHustags.test(hushtagsValue) || hushtagsValue === '';
};

// Функция валидации уникальности хэштегов
const checkHushtagsUniq = (hushtagsValue) => {
  const hushtagsArray = hushtagsValue.trim().toLowerCase().split(' ');
  const mayArray = new Set(hushtagsArray);
  return mayArray.size === hushtagsArray.length || hushtagsValue === '';
};

// Функция валидации максимального количества хэштегов
const checkHushtagsCount = (hushtagsValue) => {
  const hushtagsArray = hushtagsValue.trim().toLowerCase().split(' ');
  return hushtagsArray.length <= MAX_HASHTAGS_COUNT;
};

// Функция валидации длинны одного хэштега
const checkHashtagLength = (hashtagsValue) => {
  const regularHustags = regHashtagLength;
  return regularHustags.test(hashtagsValue) || hashtagsValue === '';
};


// Валидаторы
pristine.addValidator(hushtagsField,
  checkHushtagsStart,
  'Хэштег должен начинаться с #');

pristine.addValidator(hushtagsField,
  checkHushtagsCount,
  `Максимум ${  MAX_HASHTAGS_COUNT  } хэштегов!`);

pristine.addValidator(hushtagsField,
  checkHashtagLength,
  `Хэштег должен быть от ${ MIN_HASHTAGS_LENGTH } до ${ MAX_HASHTAGS_LENGTH } символов`);

pristine.addValidator(hushtagsField,
  checkHushtagsSymbol,
  'Между хэштегами должен быть пробел');

pristine.addValidator(hushtagsField,
  checkHushtagsUniq,
  'Хэштеги должны быть уникальными!');

pristine.addValidator(commentField,
  checkCommentLength,
  `Не более ${ MAX_LENGTH_COMMENT } символов`);

userPhotoForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  pristine.validate();
});


export {hushtagsField, commentField};
