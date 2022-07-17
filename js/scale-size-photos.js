const MAX_SIZE_VALUE = 100;
const MIN_SIZE_VALUE = 25;
const MAX_SIZE_SCALE = 'scale(1)';
const MIN_SIZE_SCALE = 'scale(0.25)';
const scaleInput = document.querySelector('.scale__control--value');
const scaleSmaller = document.querySelector('.scale__control--smaller');
const scaleBigger = document.querySelector('.scale__control--bigger');
const imgPreview = document.querySelector('.img-upload__preview img');


const biggerPhoto = () => {
  scaleInput.value = `${parseInt(scaleInput.value, 10) + MIN_SIZE_VALUE }%`;
  imgPreview.style.transform = `scale(0.${parseInt(scaleInput.value, 10)}`;
  if (parseInt(scaleInput.value, 10) >= MAX_SIZE_VALUE){
    imgPreview.style.transform = MAX_SIZE_SCALE;
    scaleInput.value = `${MAX_SIZE_VALUE }%`;
  }
};

const smallerPhoto = () => {
  scaleInput.value = `${parseInt(scaleInput.value, 10) - MIN_SIZE_VALUE }%`;
  imgPreview.style.transform = `scale(0.${parseInt(scaleInput.value, 10)}`;
  if (parseInt(scaleInput.value, 10) <= MIN_SIZE_VALUE) {
    imgPreview.style.transform = MIN_SIZE_SCALE;
    scaleInput.value = `${MIN_SIZE_VALUE }%`;
  }
  if (parseInt(scaleInput.value, 10) >= MAX_SIZE_VALUE) {
    imgPreview.style.transform = MAX_SIZE_SCALE;
    scaleInput.value = `${MAX_SIZE_VALUE }%`;
  }
};

export {imgPreview, scaleBigger, scaleSmaller, biggerPhoto, smallerPhoto};
