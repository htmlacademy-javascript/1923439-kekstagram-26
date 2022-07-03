import { createElement, isEscapeDown } from './util.js';

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

// Максимальное количество отображаемых комментариев
const MAX_COMMENT_ON_PAGE = 5;

let page = 0;
let commentsAll = [];


const onPopupEscKeydown = (evt) => {
  if (isEscapeDown(evt)) {
    evt.preventDefault();
    closeBigPicture();
  }
};

const onPopupClickOff = () => {
  closeBigPicture();
};


function closeBigPicture () {
  bigPictureSection.classList.add('hidden');
  document.querySelector('body').classList.remove('modal-open');
  document.removeEventListener('keydown', onPopupEscKeydown);
  bigPictureClose.removeEventListener('click', onPopupClickOff);
  commentShowMoreButton.removeEventListener('click', renderMoreCommentOnCLickOFF);
}

// Функция добавляющая в разметку комментарии пользователей
// const renderBigPhotosComment = (comments) => {
//   comments.forEach(({avatar, message, name}) => {
//     const commentsList = document.querySelector('.social__comments');
//     const commentsItem = createElement('li', 'social__comment');
//     const commentsItemImg = createElement('img', 'social__picture');
//     const commentsItemText = createElement('p', 'social__text');
//     commentsItemImg.src = avatar;
//     commentsItemImg.alt = name;
//     commentsItemText.textContent = message;
//     commentsItem.appendChild(commentsItemImg);
//     commentsItem.appendChild(commentsItemText);
//     commentsList.appendChild(commentsItem);
//   });
// };

// Тест идеи!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!


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

const renderBigPhotosComments = (comments) => {
  for (let i = page; i < MAX_COMMENT_ON_PAGE + page && i < comments.length; i++) {
    renderComment(comments[i]);
  }
  page += 5;
  const commentCountRange = bigPictureSection.querySelector('.social__comment-count');
  if (page >= comments.length) {
    commentShowMoreButton.classList.add('hidden');
    commentCountRange.textContent = `${comments.length  } из ${  comments.length} комментариев`;
  } else {
    commentCountRange.textContent = `${page  } из ${  comments.length} комментариев`;
  }
};

function renderMoreCommentOnCLickOFF () {
  renderBigPhotosComments(commentsAll);
}

// Функция добавляющая в разметку информацию о большой фотографии
const renderBigPhotosInfo = ({url, likes, comments, description}) => {
  bigPicture.src = url;
  likesCount.textContent = likes;
  commentsCount.textContent = comments.length;
  photoDescription.textContent = description;
  document.querySelector('.social__comments').replaceChildren();
  renderBigPhotosComments(comments);
};


const openBigPicture = (photosObject) => {
  page = 0;
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
