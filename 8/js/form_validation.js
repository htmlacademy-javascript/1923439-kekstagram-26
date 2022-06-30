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
const hashtagsField = userPhotoForm.querySelector('.text__hashtags');

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
const checkHushtagsSymbol = (hashtagsValue) => {
  const regularHashtags = regHashtagSymbol;
  return regularHashtags.test(hashtagsValue) || hashtagsValue === '';
};

// Функция валидации наличия #
const checkHushtagsStart = (hashtagsValue) => {
  const regularHushtags = regHashtagStart;
  return regularHushtags.test(hashtagsValue) || hashtagsValue === '';
};

// Функция валидации уникальности хэштегов
const checkHushtagsUniq = (hashtagsValue) => {
  const hashtagsArray = hashtagsValue.trim().toLowerCase().split(' ');
  const mayArray = new Set(hashtagsArray);
  return mayArray.size === hashtagsArray.length || hashtagsValue === '';
};

// Функция валидации максимального количества хэштегов
const checkHushtagsCount = (hashtagsValue) => {
  const hashtagsArray = hashtagsValue.trim().toLowerCase().split(' ');
  return hashtagsArray.length <= MAX_HASHTAGS_COUNT;
};

// Функция валидации длинны одного хэштега
const checkHashtagLength = (hashtagsValue) => {
  const regularHashtags = regHashtagLength;
  return regularHashtags.test(hashtagsValue) || hashtagsValue === '';
};


// Валидаторы
pristine.addValidator(hashtagsField,
  checkHushtagsStart,
  'Хэштег должен начинаться с #');

pristine.addValidator(hashtagsField,
  checkHushtagsCount,
  `Максимум ${  MAX_HASHTAGS_COUNT  } хэштегов!`);

pristine.addValidator(hashtagsField,
  checkHashtagLength,
  `Хэштег должен быть от ${ MIN_HASHTAGS_LENGTH } до ${ MAX_HASHTAGS_LENGTH } символов`);

pristine.addValidator(hashtagsField,
  checkHushtagsSymbol,
  'Между хэштегами должен быть пробел');

pristine.addValidator(hashtagsField,
  checkHushtagsUniq,
  'Хэштеги должны быть уникальными!');

pristine.addValidator(commentField,
  checkCommentLength,
  `Не более ${ MAX_LENGTH_COMMENT } символов`);

userPhotoForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  pristine.validate();
});


export {hashtagsField, commentField};
