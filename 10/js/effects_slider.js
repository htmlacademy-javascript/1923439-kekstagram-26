import {imgPreview} from './scale_size_photos.js';
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

// Функция для обновления ключей стайдера
const updateSliderOptionsNew = (min, max, step, start) => {
  sliderElement.noUiSlider.updateOptions ({
    range: {
      min: min,
      max: max,
    },
    step: step,
    start: start,
  });

};

// Функция для сброса до базовых значений ключей слайдера
const updateSliderOptionsDefault = () => {
  sliderElement.noUiSlider.updateOptions ({
    range: {
      min: 1,
      max: 100,
    },
    step: 1,
    start: 100,
  });
};

// Скрытие слайдера на оригинальном фильтре
if (originalEffect.checked) {
  sliderElement.classList.add('hidden');
}

// Добавляем и обрабатываем хром эффект
chromeEffect.addEventListener('change', (evt) => {
  if (evt.target.checked) {
    sliderElement.classList.remove('hidden');
    updateSliderOptionsNew(0, 1, 0.1, 1);
    imgPreview.className = 'effects__preview--chrome';
  } else {
    updateSliderOptionsDefault();
  }
  sliderElement.noUiSlider.on('update', () => {
    sliderValue.value = sliderElement.noUiSlider.get();
    imgPreview.style.filter = `grayscale(${sliderValue.value})`;
  });
});

// Добавляем и обрабатываем сепия эффект
sepiaEffect.addEventListener('change', (evt) => {
  if (evt.target.checked) {
    sliderElement.classList.remove('hidden');
    updateSliderOptionsNew(0, 1, 0.1, 1);
    imgPreview.className = 'effects__preview--sepia';
  } else {
    updateSliderOptionsDefault();
  }
  sliderElement.noUiSlider.on('update', () => {
    sliderValue.value = sliderElement.noUiSlider.get();
    imgPreview.style.filter = `sepia(${sliderValue.value})`;
  });
});

// Добавляем и обрабатываем марвин эффект
marvinEffect.addEventListener('change', (evt) => {
  if (evt.target.checked) {
    sliderElement.classList.remove('hidden');
    updateSliderOptionsNew(0, 100, 1, 100);
    imgPreview.className = 'effects__preview--marvin';
  } else {
    updateSliderOptionsDefault();
  }
  sliderElement.noUiSlider.on('update', () => {
    sliderValue.value = sliderElement.noUiSlider.get();
    imgPreview.style.filter = `invert(${sliderValue.value}%)`;
  });
});

// Добавляем и обрабатываем фобос эффект
phobosEffect.addEventListener('change', (evt) => {
  if (evt.target.checked) {
    sliderElement.classList.remove('hidden');
    updateSliderOptionsNew(0, 3, 0.1, 3);
    imgPreview.className = 'effects__preview--phobos';
  } else {
    updateSliderOptionsDefault();
  }
  sliderElement.noUiSlider.on('update', () => {
    sliderValue.value = sliderElement.noUiSlider.get();
    imgPreview.style.filter = `blur(${sliderValue.value}px)`;
  });
});

// Добавляем и обрабатываем зной эффект
heatEffect.addEventListener('change', (evt) => {
  if (evt.target.checked) {
    sliderElement.classList.remove('hidden');
    updateSliderOptionsNew(1, 3, 0.1, 3);
    imgPreview.className = 'effects__preview--heat';
  } else {
    updateSliderOptionsDefault();
  }
  imgPreview.classList.add('effects__preview--heat');
  sliderElement.noUiSlider.on('update', () => {
    sliderValue.value = sliderElement.noUiSlider.get();
    imgPreview.style.filter = `brightness(${sliderValue.value})`;
  });
});

// Сбрасываем все эффекты до начального
originalEffect.addEventListener('change', (evt) => {
  if (evt.target.checked) {
    sliderElement.classList.add('hidden');
    imgPreview.className = 'effects__preview--none';
  }
  imgPreview.style.filter = 'none';
});
