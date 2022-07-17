const MAX_LENGTH_COMMENT = 140;
const ALERT_SHOW_TIME = 6000;

// Функция для перемешивания массива
const shuffleArray = (array) => {
  let j, temp;
  for(let i = array.length - 1; i > 0; i--){
    j = Math.floor(Math.random()*(i + 1));
    temp = array[j];
    array[j] = array[i];
    array[i] = temp;
  }
  return array;
};

// Функция для создания элемента в разметке
const createElement = (tagName, className) => {
  const element = document.createElement(tagName);
  element.classList.add(className);
  return element;
};

// Создаём функцию проверки нажатия esc на клавиатуре
const isEscapeDown = (evt) => evt.key === 'Escape';

// Функция остановки обработчика на двух полях в фокусе
const stopListenerOnFocus = (object, method) => {
  object.addEventListener(method, (evt) => {
    evt.stopImmediatePropagation();
  });
};

// Функция для создания текста ошибки отправки данных на сервер
const renderAlertError = (message) => {
  const alertContainer = createElement('div');
  alertContainer.style.position = 'absolute';
  alertContainer.style.zIndex = '100';
  alertContainer.style.top = '0';
  alertContainer.style.left = '0';
  alertContainer.style.right = '0';
  alertContainer.style.padding = '20px 10px';
  alertContainer.style.fontSize = '20px';
  alertContainer.style.fontWeight = 'bold';
  alertContainer.style.textAlign = 'center';
  alertContainer.style.backgroundColor = 'grey';
  alertContainer.textContent = message;

  document.body.append(alertContainer);

  setTimeout(() => {
    alertContainer.remove();
  }, ALERT_SHOW_TIME);
};

// Функция для отслеживания и удаления активного класса с кнопок
const deleteActiveClassFromButton = (collections, activeClass) => {
  collections.forEach((element) => {
    if (element.classList.contains(activeClass)) {
      element.classList.remove(activeClass);
    }
  }
  );
};

// Функция устранения дребезга
const debounce = (callback, timeoutDelay) => {
  let timeoutId;
  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
};


export {MAX_LENGTH_COMMENT, shuffleArray, createElement, isEscapeDown, stopListenerOnFocus, renderAlertError, deleteActiveClassFromButton, debounce};
