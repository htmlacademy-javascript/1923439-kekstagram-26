const MAX_LENGTH_COMMENT = 140;

// Генерация случайного числа
const getPositiveRandomInt = function (min, max) {
  if (max > min && min >= 0 && max >= 0) {
    return Math.floor(Math.random() * (max - min)) + min;
  } else {
    throw new Error ('Число должно быть положительным и/или больше минимального значения!');
  }
};

getPositiveRandomInt(3,80);

// Универсальная функция для проверки длинны строки
const checksLength = function (string, stringLengthMax) {
  return string.length < stringLengthMax;
};

checksLength('Я бы не стал таким заниматься', MAX_LENGTH_COMMENT);
