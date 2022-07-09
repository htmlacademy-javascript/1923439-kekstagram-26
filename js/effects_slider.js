import {imgPreview} from './scale_size_photos.js';

const sliderContainer = document.querySelector('.img-upload__effect-level');
const sliderElement = document.querySelector('.effect-level__slider');
const sliderValue = document.querySelector('.effect-level__value');


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
const filters = {
  chrome: {
    options: {
      range: {
        min: 0,
        max: 1,
      },
      step: 0.1,
      start: 1,
    },
    filter: (value) => `grayscale(${value})`,
  },
  sepia: {
    options: {
      range: {
        min: 0,
        max: 1,
      },
      step: 0.1,
      start: 1,
    },
    filter: (value) => `sepia(${value})`,
  },
  marvin: {
    options: {
      range: {
        min: 0,
        max: 100,
      },
      step: 1,
      start: 100,
    },
    filter: (value) => `invert(${value}%)`,
  },
  phobos: {
    options: {
      range: {
        min: 0,
        max: 3,
      },
      step: 0.1,
      start: 3,
    },
    filter: (value) => `blur(${value}px)`,
  },
  heat: {
    options: {
      range: {
        min: 1,
        max: 3,
      },
      step: 0.1,
      start: 3,
    },
    filter: (value) => `brightness(${value})`,
  },
  none: {
    options: {
      range: {
        min: 1,
        max: 100,
      },
      step: 1,
      start: 100,
    },
    filter: () => 'none',
  },
};

// Универсальная функция добавления и регулирования эффектов фотографий
const renderPhotoEffect = (object) => {
  sliderContainer.classList.remove('hidden');
  sliderElement.noUiSlider.updateOptions (object.options);
  sliderElement.noUiSlider.on('update', () => {
    sliderValue.value = sliderElement.noUiSlider.get();
    imgPreview.style.filter = object.filter(sliderValue.value);
  });
};

// функция отслеживания изменений в родительской форме
const onFormChange = () => {
  const checkedFilter = document.querySelector('input[name="effect"]:checked').value;
  imgPreview.className = `effects__preview--${checkedFilter}`;
  renderPhotoEffect(filters[checkedFilter]);
  if (checkedFilter === 'none') {
    sliderContainer.classList.add('hidden');
  }
};

const onFormReset = (defaultValue) => {
  imgPreview.className = '';
  if (defaultValue === 'none') {
    sliderContainer.classList.add('hidden');
  }
};

export {onFormChange, imgPreview, onFormReset};
