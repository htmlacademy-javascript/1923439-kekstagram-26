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

// Находим диапозон отображаемых комментариев
const commentCountRange = bigPictureSection.querySelector('.social__comment-count');

// Находим кнопку загрузки свежей порции комментариев
const commentShowMoreButton = bigPictureSection.querySelector('.social__comments-loader');


// Функция закрывающая окно просмотра большой фотографии кнопкой 'Esc'
const closeBigPictureKeyBoard = () => {
  document.addEventListener('keydown', (evt) => {
    if (evt.keyCode === 27) {
      bigPictureSection.classList.add('hidden');
      document.querySelector('body').classList.remove('modal-open');
    }
  });
};

// Функция закрывающая окно просмотра большой фотографии  кликом по кнопке закрытия
const closeBigPictureClick = () => {
  bigPictureClose.addEventListener('click', () => {
    bigPictureSection.classList.add('hidden');
    document.querySelector('body').classList.remove('modal-open');
  });
};

// Функция добавляющая в разметку комментарии пользователей
const renderBigPhotosComment = (comments) => {
  comments.forEach(({avatar, message, name}) => {
    const commentsList = document.querySelector('.social__comments');
    const commentsItem = document.createElement('li');
    const commentsItemImg = document.createElement('img');
    const commentsItemText = document.createElement('p');
    commentsItem.classList.add('social__comment');
    commentsItemImg.classList.add('social__picture');
    commentsItemText.classList.add('social__text');
    commentsItemImg.src = avatar;
    commentsItemImg.alt = name;
    commentsItemText.textContent = message;
    commentsItem.appendChild(commentsItemImg);
    commentsItem.appendChild(commentsItemText);
    commentsList.appendChild(commentsItem);
  });
};

// Функция добавляющая в разметку информацию о большой фотографии
const renderBigPhotosInfo = ({url, likes, comments, description}) => {
  bigPicture.src = url;
  likesCount.textContent = likes;
  commentsCount.textContent = comments.length;
  photoDescription.textContent = description;
  bigPictureSection.classList.remove('hidden');
  commentCountRange.classList.add('hidden');
  commentShowMoreButton.classList.add('hidden');
  document.querySelector('body').classList.add('modal-open');
  closeBigPictureKeyBoard();
  closeBigPictureClick();
};

export {bigPicture, renderBigPhotosInfo, renderBigPhotosComment};
