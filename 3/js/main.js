// Данные известные заранее
const MAX_LENGTH_COMMENT = 140;
const USERS_PHOTOS_COUNT = 25;
const MAX_COUNT = 200;
const MIN_LIKES = 15;
const MIN_AVATAR_COUNT = 1;
const MAX_AVATAR_COUNT = 6;

// Данные придуманные мной
const NAMES_AUTORS = [
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
const COMMENTS = [
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'В целом всё неплохо. Но не всё.'
];

const DESCRIPTIONS = [
  'Упал лицом на кнопку "снять"',
  'Моя Мама говорит мне, что у меня есть талант',
  'Продаётся снимок - дорого',
  'За эту разработку мне такую премию дадут...',
  'Чисто жиза!'
];


// Генерация случайного числа
const getPositiveRandomInt = function (min, max) {
  if (max > min && min >= 0 && max >= 0) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
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

// Функция для генерации случайного комментария
let randomComment;
const getRandomComment = function () {
  const randomCommentMinCount = 1;
  const randomCommentMaxCount = 2;
  randomComment = COMMENTS[getPositiveRandomInt(0, COMMENTS.length - 1)];
  if (getPositiveRandomInt(randomCommentMinCount, randomCommentMaxCount) > randomCommentMinCount) {
    randomComment = `${COMMENTS[getPositiveRandomInt(0, COMMENTS.length - 1)] } ${  COMMENTS[getPositiveRandomInt(0, COMMENTS.length - 1)]}`;
  }
  return randomComment;
};

// Массив последовательных неповторящихся чисел
const ordererUnicInt = [];
for (let i = 0; i <= MAX_COUNT; i++) {
  ordererUnicInt.push(i);
}

// Функция для перемешивания массива
function shuffleArray (array) {
  let j, temp;
  for(let i = array.length - 1; i > 0; i--){
    j = Math.floor(Math.random()*(i + 1));
    temp = array[j];
    array[j] = array[i];
    array[i] = temp;
  }
  return array;
}

shuffleArray(ordererUnicInt);

// Функция для создания объекта фотографий пользователей
let userPhoto = {};
const getPhotos = function (counter) {
  userPhoto = {
    id: counter,
    url: `photos/${counter}.jpg` ,
    description: getRandomArrayElement(DESCRIPTIONS),
    likes: getPositiveRandomInt(MIN_LIKES, MAX_COUNT),
    comments: [
      {
        id: ordererUnicInt[counter],
        avatar: `img/avatar-${getPositiveRandomInt(MIN_AVATAR_COUNT, MAX_AVATAR_COUNT)}.svg`,
        message: getRandomComment(),
        name: getRandomArrayElement(NAMES_AUTORS)
      }
    ]
  };
  return userPhoto;
};

// let userComments = [];
// function getMultiComments (counter) {
//   userComments = [
//     {
//       id: shuffleArray(ordererUnicInt[counter]),
//       avatar: `img/avatar-${getPositiveRandomInt(1, 6)}.svg`,
//       message: getRandomComment(),
//       name: getRandomArrayElement(NAMES_AUTORS)
//     }
//   ];
//   return userComments;
// };

// Массив объектов с фотографиями пользователей
const photosArray = [];
for (let i = 1; i <= USERS_PHOTOS_COUNT; i++) {
  photosArray.push(getPhotos(i));
  // Вот здесь хотелось бы создать условие с рандомными числами от 1 до 5, по результятом которого
  // в объект пихался бы ещё от 1 до 5 массивов комментариев
}

// const photosArray = Array.from({length: USERS_PHOTOS_COUNT}, getPhotos);

// Собираем массив объектов
// const photosArrayOld = [];
// for (let i = 1; i <= 7; i++) {
//   photosArray[i] = getPhotos();
//   photosArray[i].id = i;
//   photosArray[i].url = `photos/${i}.jpg`;
//   photosArray[i].description = getRandomArrayElement(DESCRIPTIONS);
//   photosArray[i].likes = getPositiveRandomInt(15, 200);
//   photosArray[i].comments.id = getPositiveRandomInt(1, 7);
//   for (let j = 1; j < i; j++) {
//     if (photosArray[i].comments.id === photosArray[j].comments.id) {
//       photosArray[i].comments.id = getPositiveRandomInt(199, 200);
//     }
//   }
//   photosArray[i].comments.avatar = `img/avatar-${getPositiveRandomInt(1, 6)}.svg`;
//   photosArray[i].comments.message = COMMENTS[getPositiveRandomInt(0, COMMENTS.length - 1)];
//   if (getPositiveRandomInt(1, 2) > 1) {
//     photosArray[i].comments.message = `${COMMENTS[getPositiveRandomInt(0, COMMENTS.length - 1)] } ${  COMMENTS[getPositiveRandomInt(0, COMMENTS.length - 1)]}`;
//   }
//   photosArray[i].comments.name = getRandomArrayElement(NAMES_AUTORS);
// }
