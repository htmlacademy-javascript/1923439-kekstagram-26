// Находим секцию детального просмотра фотографий
const bigPictureSection = document.querySelector('.big-picture');

// Находим кнопку закрытия окна просмотра большой фотографии
const bigPictureClose = bigPictureSection.querySelector('.big-picture__cancel');

// Находим тег img с большой фотографией
const bigPicture = bigPictureSection.querySelector('.big-picture__img img');

// Находим счётчик лайков
const likesCount = bigPictureSection.querySelector('.likes-count');

// Находим счётчик комментариев
const commentsCount = bigPictureSection.querySelector('.comments-count');

// Находим описание большой фотографии
const photoDescription = bigPictureSection.querySelector('.social__caption');


// Функция закрывающая окно просмотра большой фотографии кнопкой 'Esc'
const closeBigPictureKeyBoard = () => {
  document.addEventListener('keydown', (evt) => {
    if (evt.keyCode === 27) {
      bigPictureSection.classList.add('hidden');
    }
  });
};

// Функция закрывающая окно просмотра большой фотографии  кликом по кнопке закрытия
const closeBigPictureClick = () => {
  bigPictureClose.addEventListener('click', () => {
    bigPictureSection.classList.add('hidden');
  });
};

// Функция добавляющая в разметку информацию о большой фотографии
const renderBigPhotosInfo = ({url, likes, comments, description}) => {
  bigPicture.src = url;
  likesCount.textContent = likes;
  commentsCount.textContent = comments.length;
  photoDescription.textContent = description;
  bigPictureSection.classList.remove('hidden');
  closeBigPictureKeyBoard();
  closeBigPictureClick();
};

// Функция добавляющая в разметку комментарии пользователей

export {bigPicture, renderBigPhotosInfo};
