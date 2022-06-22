// Находим секцию детального просмотра фотографий
const bigPictureSection = document.querySelector('.big-picture');

// Находим кнопку закрытия окна просмотра большой фотографии
const bigPictureClose = bigPictureSection.querySelector('.big-picture__cancel');

// Находим контейнер с большой фотографией
const bigPicture = bigPictureSection.querySelector('.big-picture__img img');
const likesCount = bigPictureSection.querySelector('.likes-count');
const commentsCount = bigPictureSection.querySelector('.comments-count');
const photoDescription = bigPictureSection.querySelector('.social__caption');


// Функция закрывающая окно просмотра большой фотографии кнопкой 'Esc'
const getCloseBigPictureKeyBoard = () => {
  document.addEventListener('keydown', (evt) => {
    if (evt.keyCode === 27) {
      bigPictureSection.classList.add('hidden');
    }
  });
};

// Функция закрывающая окно просмотра большой фотографии  кликом по кнопке закрытия
const getCloseBigPictureClick = () => {
  bigPictureClose.addEventListener('click', () => {
    bigPictureSection.classList.add('hidden');
  });
};

const getPhotosInfo = ({url, likes, comments, description}) => {
  bigPicture.src = url;
  likesCount.textContent = likes;
  commentsCount.textContent = comments.length;
  photoDescription.textContent = description;
  bigPictureSection.classList.remove('hidden');
  getCloseBigPictureKeyBoard();
  getCloseBigPictureClick();
};

export {bigPicture, getPhotosInfo};
