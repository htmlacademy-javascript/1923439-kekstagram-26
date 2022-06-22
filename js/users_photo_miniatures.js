const usersMiniaturesContainer = document.querySelector('.pictures');
const usersMiniaturesTemplate = document.querySelector('#picture').content.querySelector('.picture');


const usersMiniaturesFragment = document.createDocumentFragment();

const getUsersMiniatures = (array) => {
  array.forEach(({url, likes, comments}) => {
    const usersMiniaturesElement = usersMiniaturesTemplate.cloneNode(true);
    usersMiniaturesElement.querySelector('.picture__img').src = url;
    usersMiniaturesElement.querySelector('.picture__comments').textContent = comments.length;
    usersMiniaturesElement.querySelector('.picture__likes').textContent = likes;
    usersMiniaturesFragment.appendChild(usersMiniaturesElement);
  });
  usersMiniaturesContainer.appendChild(usersMiniaturesFragment);
};

export {getUsersMiniatures};
