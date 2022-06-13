// Генерация случайного числа
const getPositiveRandomInt = (min, max) => {
  if (max > min && min >= 0 && max >= 0) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  } else {
    throw new Error ('Число должно быть положительным и/или больше минимального значения!');
  }
};

export {getPositiveRandomInt};
