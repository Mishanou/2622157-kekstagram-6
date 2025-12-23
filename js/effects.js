import { EFFECTS } from './consts.js';
import { toggleHidden } from './utils.js';

let currentEffect = EFFECTS.none;
let sliderContainer, sliderElement, effectLevelValue, imagePreview;

const onEffectChange = (evt) => {
  if (evt.target.name === 'effect') {
    const selectedEffect = EFFECTS[evt.target.value];
    changeEffect(selectedEffect);
  }
};

const updateSliderOptions = (effect) => {
  sliderElement.noUiSlider.updateOptions({
    range: {
      min: effect.min,
      max: effect.max,
    },
    step: effect.step,
    start: effect.max,
  });
};

const updateEffectLevelValue = (value) => {
  effectLevelValue.value = value;
};

const resetImageFilter = () => {
  imagePreview.style.filter = '';
};

const applyEffectToImage = (value) => {
  if (currentEffect.name === 'none') {
    resetImageFilter();
  } else {
    imagePreview.style.filter = currentEffect.getFilterStyle(value);
  }
};

const initEffects = () => {
  sliderContainer = document.querySelector('.img-upload__effect-level');
  sliderElement = document.querySelector('.effect-level__slider');
  effectLevelValue = document.querySelector('.effect-level__value');
  imagePreview = document.querySelector('.img-upload__preview img');
  const effectsList = document.querySelector('.effects__list');

  toggleHidden(sliderContainer, true);

  noUiSlider.create(sliderElement, {
    range: {
      min: EFFECTS.none.min,
      max: EFFECTS.none.max,
    },
    start: EFFECTS.none.max,
    step: EFFECTS.none.step,
    connect: 'lower',
    format: {
      to: (value) => Number.isInteger(value) ? value.toFixed(0) : value.toFixed(1),
      from: (value) => parseFloat(value),
    },
  });

  sliderElement.noUiSlider.on('update', () => {
    const sliderValue = sliderElement.noUiSlider.get();
    updateEffectLevelValue(sliderValue);
    applyEffectToImage(sliderValue);
  });

  effectsList.addEventListener('change', onEffectChange);
};

function changeEffect (effect) {
  currentEffect = effect;
  imagePreview.className = '';
  imagePreview.classList.add(`effects__preview--${effect.name}`);

  if (effect.name === 'none') {
    toggleHidden(sliderContainer, true);
    resetImageFilter();
    return;
  }

  updateSliderOptions(effect);
  toggleHidden(sliderContainer, false);
  sliderElement.noUiSlider.set(effect.max);
}

const resetEffects = () => {
  const originalEffectRadio = document.querySelector('#effect-none');
  if (originalEffectRadio) {
    originalEffectRadio.checked = true;
  }
  changeEffect(EFFECTS.none);
  resetImageFilter();
  if (sliderElement.noUiSlider) {
    sliderElement.noUiSlider.destroy();
  }
};

export { initEffects, resetEffects };
