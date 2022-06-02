// Переменные, нужные для неуниверсальных функций
const MAX_LENGTH_COMMENT = 140;
const MAX_LENGTH_HASHTAG = 20;

// Генерация случайного числа
const getRandomNumber = function (firstNumber, secondNumber) {
  return Math.floor(Math.random() * (secondNumber - firstNumber)) + firstNumber;
};

getRandomNumber(3,80);

// Универсальная функция для проверки длинны строки
const checksLength = function (currentLength, maxLength) {
  if (currentLength > maxLength) {
    return false;
  } else {
    return true;
  }
};

checksLength(22,100);

// Проверка длинны комментария (Неуниверсальная)
const checksLengthComment = function (currentLength) {
  if (currentLength > MAX_LENGTH_COMMENT) {
    return false;
  } else {
    return true;
  }
};

checksLengthComment(25);

// Проверка длины хэштега (Неуниверсальная)
const checksLengthHashtag = function (currentLength) {
  if (currentLength > MAX_LENGTH_HASHTAG) {
    return false;
  } else {
    return true;
  }
};

checksLengthHashtag(15);
