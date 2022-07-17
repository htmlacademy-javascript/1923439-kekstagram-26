import {openEditPhotosPopup} from './form-open.js';

const FILE_TYPES = ['jpg', 'jpeg', 'png'];
const uploadField = document.querySelector('.img-upload__input');
const previewPhoto = document.querySelector('.img-upload__preview img');


uploadField.addEventListener('change', () => {
  openEditPhotosPopup();
  const file = uploadField.files[0];
  const fileName = file.name.toLowerCase();

  const matches = FILE_TYPES.some((it) => fileName.endsWith(it));

  if (matches) {
    previewPhoto.src = URL.createObjectURL(file);
  }
});

export {uploadField};
