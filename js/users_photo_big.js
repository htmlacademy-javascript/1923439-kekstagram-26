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

// Находим диапозон отображаемых комментариев
const commentCountRange = bigPictureSection.querySelector('.social__comment-count');

// Находим кнопку загрузки свежей порции комментариев
const commentShowMoreButton = bigPictureSection.querySelector('.social__comments-loader');

const firstCommentsCount = 5;
let commentsMax = 5;
let commentsMin = 5;

const onPopupEscKeydown = (evt) => {
  if (isEscapeDown(evt)) {
    evt.preventDefault();
    closeBigPicture();
  }
};

const onPopupClickOff = () => {
  closeBigPicture();
};


function openBigPicture () {
  bigPictureSection.classList.remove('hidden');
  document.querySelector('body').classList.add('modal-open');
  document.addEventListener('keydown', onPopupEscKeydown);
  bigPictureClose.addEventListener('click', onPopupClickOff);
  commentShowMoreButton.addEventListener('click', renderMoreCommentOnCLickOff);
  commentsMax = 5;
  commentsMin = 5;
}

function closeBigPicture () {
  bigPictureSection.classList.add('hidden');
  document.querySelector('body').classList.remove('modal-open');
  document.removeEventListener('keydown', onPopupEscKeydown);
  bigPictureClose.removeEventListener('click', onPopupClickOff);
  commentShowMoreButton.removeEventListener('click', renderMoreCommentOnCLickOff);
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

function renderMoreCommentOnCLickOff (comments) {
  renderMoreCommentOnCLick(comments);
}

function renderMoreCommentOnCLick (comments) {
  commentsMax += 5;
  console.log(commentsMin,commentsMax);
  (function () {
    if (commentsMax <= comments.length || commentsMin <= comments.length) {
      for (let i = commentsMin; i < comments.length && i < commentsMax; i++) {
        const commentsList = document.querySelector('.social__comments');
        const commentsItem = createElement('li', 'social__comment');
        const commentsItemImg = createElement('img', 'social__picture');
        const commentsItemText = createElement('p', 'social__text');
        commentsItemImg.src = comments[i].avatar;
        commentsItemImg.alt = comments[i].name;
        commentsItemText.textContent = comments[i].message;
        commentsItem.appendChild(commentsItemImg);
        commentsItem.appendChild(commentsItemText);
        commentsList.appendChild(commentsItem);
      }
    }
    commentsMin += 5;
  }());
  commentShowMoreButton.removeEventListener('click', renderMoreCommentOnCLickOff);
}

const renderBigPhotosComment = (comments) => {
  (function () {
    for (let i = 0; i < firstCommentsCount && i < comments.length; i++) {
      const commentsList = document.querySelector('.social__comments');
      const commentsItem = createElement('li', 'social__comment');
      const commentsItemImg = createElement('img', 'social__picture');
      const commentsItemText = createElement('p', 'social__text');
      commentsItemImg.src = comments[i].avatar;
      commentsItemImg.alt = comments[i].name;
      commentsItemText.textContent = comments[i].message;
      commentsItem.appendChild(commentsItemImg);
      commentsItem.appendChild(commentsItemText);
      commentsList.appendChild(commentsItem);
    }
  }());
};

// Функция добавляющая в разметку информацию о большой фотографии
const renderBigPhotosInfo = ({url, likes, comments, description}) => {
  bigPicture.src = url;
  likesCount.textContent = likes;
  commentsCount.textContent = comments.length;
  photoDescription.textContent = description;
};


export {bigPicture, renderBigPhotosInfo, renderBigPhotosComment, openBigPicture, closeBigPicture, onPopupEscKeydown, renderMoreCommentOnCLick, renderMoreCommentOnCLickOff, commentShowMoreButton};
