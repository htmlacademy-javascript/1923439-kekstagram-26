const MAX_LENGTH_COMMENT = 140;

// Генерация случайного числа
const getRandomNumber = function (firstNumber, secondNumber) {
  return Math.floor(Math.random() * (secondNumber - firstNumber)) + firstNumber;
};

getRandomNumber(3,80);

// Проверка длинны комментария
const checksLengthComment = function (currentLengthComment) {
  if (currentLengthComment > MAX_LENGTH_COMMENT) {
    return false;
  } else {
    return true;
  }
};

checksLengthComment(25);

//
