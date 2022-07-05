import {imgPreview} from './scale_size_photos.js';

const sliderContainer = document.querySelector('.img-upload__effect-level')
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

// Скрытие слайдера на оригинальном фильтре
if (originalEffect.checked) {
  sliderContainer.classList.add('hidden');
}

// Функции эффектов фильтров фотографий
const renderChromEffect = () => {
  sliderContainer.classList.remove('hidden');
  sliderElement.noUiSlider.updateOptions ({
    range: {
      min: 0,
      max: 1,
    },
    step: 0.1,
    start: 1,
  });
  sliderElement.noUiSlider.on('update', () => {
    sliderValue.value = sliderElement.noUiSlider.get();
    imgPreview.style.filter = `grayscale(${sliderValue.value})`;
  });
};

const renderSepiaEffect = () => {
  sliderContainer.classList.remove('hidden');
  sliderElement.noUiSlider.updateOptions ({
    range: {
      min: 0,
      max: 1,
    },
    step: 0.1,
    start: 1,
  });
  sliderElement.noUiSlider.on('update', () => {
    sliderValue.value = sliderElement.noUiSlider.get();
    imgPreview.style.filter = `sepia(${sliderValue.value})`;
  });
};

const renderMarvinEffect = () => {
  sliderContainer.classList.remove('hidden');
  sliderElement.noUiSlider.updateOptions ({
    range: {
      min: 0,
      max: 100,
    },
    step: 1,
    start: 100,
  });
  sliderElement.noUiSlider.on('update', () => {
    sliderValue.value = sliderElement.noUiSlider.get();
    imgPreview.style.filter = `invert(${sliderValue.value}%)`;
  });
};

const renderPhobosEffect = () => {
  sliderContainer.classList.remove('hidden');
  sliderElement.noUiSlider.updateOptions ({
    range: {
      min: 0,
      max: 3,
    },
    step: 0.1,
    start: 3,
  });
  sliderElement.noUiSlider.on('update', () => {
    sliderValue.value = sliderElement.noUiSlider.get();
    imgPreview.style.filter = `blur(${sliderValue.value}px)`;
  });
};

const renderHeatEffect = () => {
  sliderContainer.classList.remove('hidden');
  sliderElement.noUiSlider.updateOptions ({
    range: {
      min: 1,
      max: 3,
    },
    step: 0.1,
    start: 3,
  });
  sliderElement.noUiSlider.on('update', () => {
    sliderValue.value = sliderElement.noUiSlider.get();
    imgPreview.style.filter = `brightness(${sliderValue.value})`;
  });
};

const renderOriginalEffect = () => {
  sliderContainer.classList.add('hidden');
  imgPreview.style.filter = 'none';
};

// функция отслеживания изменений в родительской форме
const onFormChange = (evt) => {
  if (evt.target.matches('input[id="effect-chrome"]')) {
    renderChromEffect();
    imgPreview.className = `effects__preview--${chromeEffect.value}`;
  }
  if (evt.target.matches('input[id="effect-sepia"]')) {
    renderSepiaEffect();
    imgPreview.className = `effects__preview--${sepiaEffect.value}`;
  }
  if (evt.target.matches('input[id="effect-marvin"]')) {
    renderMarvinEffect();
    imgPreview.className = `effects__preview--${marvinEffect.value}`;
  }
  if (evt.target.matches('input[id="effect-phobos"]')) {
    renderPhobosEffect();
    imgPreview.className = `effects__preview--${phobosEffect.value}`;
  }
    if (evt.target.matches('input[id="effect-heat"]')) {
    renderHeatEffect();
    imgPreview.className = `effects__preview--${heatEffect.value}`;
  }
  if (evt.target.matches('input[id="effect-none"]')) {
    renderOriginalEffect();
    imgPreview.className = `effects__preview--${originalEffect.value}`;
  }
};

export {onFormChange};
