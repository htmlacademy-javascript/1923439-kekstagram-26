import {createElement, isEscapeDown} from './util.js';

// Максимальное количество отображаемых комментариев за один раз
const MAX_COMMENT_ON_PAGE = 5;

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

// Находим кнопку загрузки свежей порции комментариев
const commentShowMoreButton = bigPictureSection.querySelector('.social__comments-loader');

// Текущее значение пагинации комментариев
let currPage = 1;

// переменная для доступа к эллементу массива с комментариями
let commentsAll = [];

// Функция для удаления обработчика закрытия по нажатию esc
const onPopupEscKeydown = (evt) => {
  if (isEscapeDown(evt)) {
    evt.preventDefault();
    closeBigPicture();
  }
};

// Функция для удаления обработчика закрытия по клику
const onPopupClickOff = () => {
  closeBigPicture();
};

// функция для закрытия окна просмотра большой фотографии
function closeBigPicture () {
  bigPictureSection.classList.add('hidden');
  document.querySelector('body').classList.remove('modal-open');
  document.removeEventListener('keydown', onPopupEscKeydown);
  bigPictureClose.removeEventListener('click', onPopupClickOff);
  commentShowMoreButton.removeEventListener('click', renderMoreCommentOnCLickOFF);
}

// Функция для отрисовки одного комментария
const renderComment = (comment) => {
  const commentsList = document.querySelector('.social__comments');
  const commentsItem = createElement('li', 'social__comment');
  const commentsItemImg = createElement('img', 'social__picture');
  const commentsItemText = createElement('p', 'social__text');
  commentsItemImg.src = comment.avatar;
  commentsItemImg.alt = comment.name;
  commentsItemText.textContent = comment.message;
  commentsItem.appendChild(commentsItemImg);
  commentsItem.appendChild(commentsItemText);
  commentsList.appendChild(commentsItem);
};

// Функция реализации пагинации комментариев
const renderBigPhotosComments = (comments, page) => {
  const start = (page - 1) * MAX_COMMENT_ON_PAGE;
  let end = page * MAX_COMMENT_ON_PAGE;
  for (let i = start; i < end && i < comments.length; i++) {
    renderComment(comments[i]);
  }
  const commentCountRange = bigPictureSection.querySelector('.social__comment-count');
  if (end >= comments.length) {
    commentShowMoreButton.classList.add('hidden');
    end = comments.length;
  }
  commentCountRange.textContent = `${end  } из ${  comments.length} комментариев`;
};

// Функция для удаления обработчика по клику на "Загрузить ещё"
function renderMoreCommentOnCLickOFF () {
  currPage++;
  renderBigPhotosComments(commentsAll, currPage);
}

// Функция добавляющая в разметку информацию о большой фотографии
const renderBigPhotosInfo = ({url, likes, comments, description}) => {
  bigPicture.src = url;
  likesCount.textContent = likes;
  commentsCount.textContent = comments.length;
  photoDescription.textContent = description;
  document.querySelector('.social__comments').replaceChildren();
  renderBigPhotosComments(comments, currPage);
};

// Функция для отрисовки окна с большой фотографией
const openBigPicture = (photosObject) => {
  currPage = 1;
  commentShowMoreButton.classList.remove('hidden');
  renderBigPhotosInfo(photosObject);
  bigPictureSection.classList.remove('hidden');
  document.querySelector('body').classList.add('modal-open');
  document.addEventListener('keydown', onPopupEscKeydown);
  bigPictureClose.addEventListener('click', onPopupClickOff);
  commentShowMoreButton.addEventListener('click', renderMoreCommentOnCLickOFF);
  commentsAll = photosObject.comments;
};


export {bigPicture, renderBigPhotosInfo, renderBigPhotosComments, openBigPicture, closeBigPicture, onPopupEscKeydown, commentShowMoreButton, renderMoreCommentOnCLickOFF };
