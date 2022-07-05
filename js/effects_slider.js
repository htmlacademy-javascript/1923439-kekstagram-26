import {imgPreview} from './scale_size_photos.js';

const sliderContainer = document.querySelector('.img-upload__effect-level');
const sliderElement = document.querySelector('.effect-level__slider');
const sliderValue = document.querySelector('.effect-level__value');
const chromeEffect = document.querySelector('#effect-chrome');
const sepiaEffect = document.querySelector('#effect-sepia');
const marvinEffect = document.querySelector('#effect-marvin');
const phobosEffect = document.querySelector('#effect-phobos');
const heatEffect = document.querySelector('#effect-heat');
const originalEffect = document.querySelector('#effect-none');

// Создаём слайдер
noUiSlider.create(sliderElement, {
  range: {
    min: 1,
    max: 100,
  },
  step: 1,
  start: 100,
  connect: 'lower',
  format: {
    to: function (value) {
      if (Number.isInteger(value)) {
        return value.toFixed(0);
      }
      return value.toFixed(1);
    },
    from: function (value) {
      return parseFloat(value);
    },
  },
});

// Создаём словарь
const sliderOptionsList = {
  min: [0, 1],
  max: [1, 100, 3],
  step: [0.1, 1],
  start: [1, 100, 3],
  effects: ['grayscale', 'sepia', 'invert', 'blur', 'brightness'],
  unit: ['%', 'px', ''],
};

// Универсальная функция добавления и регулирования эффектов фотографий
const renderPhotoEffect = (min, max, step, start, effects, unit) => {
  sliderContainer.classList.remove('hidden');
  sliderElement.noUiSlider.updateOptions ({
    range: {
      min: min,
      max: max,
    },
    step: step,
    start: start,
  });
  sliderElement.noUiSlider.on('update', () => {
    sliderValue.value = sliderElement.noUiSlider.get();
    imgPreview.style.filter = `${effects}(${sliderValue.value}${unit})`;
  });
};

// Скрытие слайдера на оригинальном фильтре при открытии страницы
if (originalEffect.checked) {
  sliderContainer.classList.add('hidden');
}

// функция отслеживания изменений в родительской форме
const onFormChange = (evt) => {
  if (evt.target.matches('input[id="effect-chrome"]')) {
    renderPhotoEffect(
      sliderOptionsList.min[0],
      sliderOptionsList.max[0],
      sliderOptionsList.step[0],
      sliderOptionsList.start[0],
      sliderOptionsList.effects[0],
      sliderOptionsList.unit[2]);
    imgPreview.className = `effects__preview--${chromeEffect.value}`;
  }
  if (evt.target.matches('input[id="effect-sepia"]')) {
    renderPhotoEffect(
      sliderOptionsList.min[0],
      sliderOptionsList.max[0],
      sliderOptionsList.step[0],
      sliderOptionsList.start[0],
      sliderOptionsList.effects[1],
      sliderOptionsList.unit[2]);
    imgPreview.className = `effects__preview--${sepiaEffect.value}`;
  }
  if (evt.target.matches('input[id="effect-marvin"]')) {
    renderPhotoEffect(
      sliderOptionsList.min[0],
      sliderOptionsList.max[1],
      sliderOptionsList.step[1],
      sliderOptionsList.start[1],
      sliderOptionsList.effects[2],
      sliderOptionsList.unit[0]);
    imgPreview.className = `effects__preview--${marvinEffect.value}`;
  }
  if (evt.target.matches('input[id="effect-phobos"]')) {
    renderPhotoEffect(
      sliderOptionsList.min[0],
      sliderOptionsList.max[2],
      sliderOptionsList.step[0],
      sliderOptionsList.start[2],
      sliderOptionsList.effects[3],
      sliderOptionsList.unit[1]);
    imgPreview.className = `effects__preview--${phobosEffect.value}`;
  }
  if (evt.target.matches('input[id="effect-heat"]')) {
    renderPhotoEffect(
      sliderOptionsList.min[1],
      sliderOptionsList.max[2],
      sliderOptionsList.step[0],
      sliderOptionsList.start[2],
      sliderOptionsList.effects[4],
      sliderOptionsList.unit[2]);
    imgPreview.className = `effects__preview--${heatEffect.value}`;
  }
  if (evt.target.matches('input[id="effect-none"]')) {
    sliderContainer.classList.add('hidden');
    imgPreview.style.filter = 'none';
    imgPreview.className = `effects__preview--${originalEffect.value}`;
  }
};

export {onFormChange};
