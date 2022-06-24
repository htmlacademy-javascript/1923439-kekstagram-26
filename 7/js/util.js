const MAX_LENGTH_COMMENT = 140;
const MAX_COUNT = 200;

// Генерация случайного числа
const getPositiveRandomInt = (min, max) => {
  if (max > min && min >= 0 && max >= 0) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  } else {
    throw new Error ('Число должно быть положительным и/или больше минимального значения!');
  }
};

// Функция для создания рандомного индекса элемента
const getRandomArrayElement = (elements) => elements[getPositiveRandomInt(0, elements.length - 1)];

// Универсальная функция для проверки длинны строки
const checksLength = (string, stringLengthMax) => string.length <= stringLengthMax;

// Функция для создания массива последовательных неповторящихся чисел
const getOrderUnicArray = (maxCount) => {
  const unicArray = [];
  for (let i = 1; i <= maxCount; i++) {
    unicArray.push(i);
  }
  return unicArray;
};

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

export {getRandomArrayElement, getPositiveRandomInt, checksLength, MAX_COUNT, MAX_LENGTH_COMMENT, shuffleArray, getOrderUnicArray, createElement, isEscapeDown};
