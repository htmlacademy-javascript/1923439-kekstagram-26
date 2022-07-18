import {sendData} from './server.js';
import {MAX_LENGTH_COMMENT, stopListenerOnFocus} from './util.js';
import {closeEditPhotosPopup} from './form-open.js';
import './effects-slider.js';

// Максимальное количество хэштегов
const MAX_HASHTAGS_COUNT = 5;

// Минимальное количество символов в хэштеге
const MIN_HASHTAGS_LENGTH = 2;

// Максимальное количество символов в хэштеге
const MAX_HASHTAGS_LENGTH = 20;

// Находим форму для загрузки фотографии пользователем
const userPhotoForm = document.querySelector('.img-upload__form');

// Находим инпут с хэштегами
const hashtagsField = userPhotoForm.querySelector('.text__hashtags');

// Находим инпут с комментариями
const commentField = userPhotoForm.querySelector('.text__description');

// Регулярка для проверки Символов
const regHashtagSymbol = /^#[A-Za-zА-Яа-яЁё0-9]{0,100}(\s#[A-Za-zА-Яа-яЁё0-9]{0,100}){0,20}$/i;

// Находим кнопку отправки формы
const submitButton = document.querySelector('.img-upload__submit');

// Находим шаблон удачной отправки формы
const successFormTemplate = document.querySelector('#success').content.querySelector('.success');

// Находим шаблон неудачной отправки формы
const failFormTemplate = document.querySelector('#error').content.querySelector('.error');

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

// Функция валидации символики
const checkHashtagsSymbol = (hashtagsValue) => {
  const regularHashtags = regHashtagSymbol;
  return regularHashtags.test(hashtagsValue) || hashtagsValue === '';
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
const checkLengthHashtags = (hashtagsValue) => {
  if (hashtagsValue === '') {
    return true;
  }
  const hashtagsArray = hashtagsValue.split(' ');
  for (let i = 0; i < hashtagsArray.length; i++) {
    if (hashtagsArray[i].length < MIN_HASHTAGS_LENGTH || hashtagsArray[i].length >= MAX_HASHTAGS_LENGTH) {
      return false;
    }
  }
  return true;
};

// Функция валидации наличия #
const checkFirstSymbolHashtags = (hashtagsValue) => {
  if (hashtagsValue === '') {
    return true;
  }
  const hashtagsArray = hashtagsValue.split(' ');
  for (let i = 0; i < hashtagsArray.length; i++) {
    if (hashtagsArray[i][0] !== '#') {
      return false;
    }
  }
  return true;
};


// Валидаторы
pristine.addValidator(hashtagsField,
  checkFirstSymbolHashtags,
  'Хэштег должен начинаться с #');

pristine.addValidator(hashtagsField,
  checkHushtagsCount,
  `Максимум ${  MAX_HASHTAGS_COUNT  } хэштегов!`);

pristine.addValidator(hashtagsField,
  checkLengthHashtags,
  `Хэштег должен быть от ${ MIN_HASHTAGS_LENGTH } до ${ MAX_HASHTAGS_LENGTH } символов`);

pristine.addValidator(hashtagsField,
  checkHashtagsSymbol,
  'Между хэштегами должен быть пробел');

pristine.addValidator(hashtagsField,
  checkHushtagsUniq,
  'Хэштеги должны быть уникальными!');

pristine.addValidator(commentField,
  checkCommentLength,
  `Не более ${ MAX_LENGTH_COMMENT } символов`);

// Функция блокирующая кнопку отправки
const blockSubmitButton = (boolean, text) => {
  submitButton.disabled = boolean;
  submitButton.textContent = text;
};

//Функция создания окна успещной отправки формы
const renderSuccessFormSubmit = () => {
  closeEditPhotosPopup();
  const successFormElement = successFormTemplate.cloneNode(true);
  document.body.appendChild(successFormElement);
  const successButton = successFormElement.querySelector('.success__button');
  const successSection = document.querySelector('.success');
  const successBackground  = document.querySelector('.success__inner');
  const removeSuccessWindow = () => {
    userPhotoForm.reset();
    successFormElement.remove();
    document.removeEventListener('keydown', removeSuccessWindow);
  };
  stopListenerOnFocus(successBackground, 'click');
  successSection.addEventListener('click', removeSuccessWindow);
  successButton.addEventListener('click', removeSuccessWindow);
  document.addEventListener('keydown', removeSuccessWindow);
};

//Функция создания окна ошибки отправки формы
const renderFailFormSubmit = () => {
  closeEditPhotosPopup();
  const failFormElement = failFormTemplate.cloneNode(true);
  document.body.appendChild(failFormElement);
  const failButton = failFormElement.querySelector('.error__button');
  const failbackground = document.querySelector('.error');
  const errorBackground  = document.querySelector('.error__inner');
  const removeFailWindow = () => {
    failFormElement.remove();
    document.removeEventListener('keydown', removeFailWindow);
  };
  stopListenerOnFocus(errorBackground, 'click');
  failbackground.addEventListener('click', removeFailWindow);
  failButton.addEventListener('click', removeFailWindow);
  document.addEventListener('keydown', removeFailWindow);
};


// Отправка формы
const setUserFormSubmit = (onSuccess, fail) => {
  userPhotoForm.addEventListener('submit', (evt) => {
    evt.preventDefault();
    if (pristine.validate()) {
      blockSubmitButton(true, 'Публикуем...');
      sendData(
        () => onSuccess(),
        () => fail(),
        new FormData(evt.target),
      );
    }
  });
};

export {hashtagsField, commentField, userPhotoForm, setUserFormSubmit, blockSubmitButton, renderSuccessFormSubmit, renderFailFormSubmit};
