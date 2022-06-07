/* eslint-disable no-unused-vars */
// Данные известные заранее
const MAX_LENGTH_COMMENT = 140;
const USERS_PHOTOS_COUNT = 25;

// Данные придуманные мной
const namesAutors = [
  'Иван',
  'Платон',
  'Евлампий',
  'Ухтын',
  'Бурдюк',
  'Патап',
  'Алёшка',
  'Милена',
  'Даздраперма',
  'Аглая',
  'Фёкла',
  'Галя',
  'Зина'
];
const comments = [
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.'
];

const descriptions = [
  'Упал лицом на кнопку "снять"',
  'Моя Мама говорит мне, что у меня есть талант',
  'Продаётся снимок - дорого',
  'За эту разработку мне такую премию дадут...',
  'Чисто жиза!'
];


// Генерация случайного числа
const getPositiveRandomInt = function (min, max) {
  if (max > min && min >= 0 && max >= 0) {
    return Math.floor(Math.random() * (max - min)) + min;
  } else {
    throw new Error ('Число должно быть положительным и/или больше минимального значения!');
  }
};

// Универсальная функция для проверки длинны строки
const checksLength = function (string, stringLengthMax) {
  return string.length <= stringLengthMax;
};

checksLength('Я бы не стал таким заниматься', MAX_LENGTH_COMMENT);

// Функция для создания рандомного индекса элемента
const getRandomArrayElement = function (elements) {
  return elements[getPositiveRandomInt(0, elements.length - 1)];
};

// Функция для создания массива с обектами фотографий пользователей
const getPhotos = function () {
  return  {
    id: getPositiveRandomInt(1, 25),
    url: `photos/${getPositiveRandomInt(1, 25) }.jpg`,
    description: getRandomArrayElement(descriptions),
    likes: getPositiveRandomInt(15, 200),
    comments: [
      {
        id: getPositiveRandomInt(1, 200),
        avatar: `img/avatar-${getPositiveRandomInt(1, 6)}.svg`,
        message: getRandomArrayElement(comments),
        name: getRandomArrayElement(namesAutors)
      }
    ]
  };
};

const photos = Array.from({length: USERS_PHOTOS_COUNT}, getPhotos);
