const SCALE_CONFIG = {
  MAX: 100,
  MIN: 25,
  STEP: 25,
  DEFAULT: 100
};

let currentScale = SCALE_CONFIG.DEFAULT;
let scaleControlField, smallerButton, biggerButton, scaleValue, image;

const updateUI = () => {
  scaleValue.value = `${currentScale}%`;
  image.style.transform = `scale(${currentScale * 0.01})`;
  smallerButton.disabled = currentScale <= SCALE_CONFIG.MIN;
  biggerButton.disabled = currentScale >= SCALE_CONFIG.MAX;
};

const changeScale = (step) => {
  currentScale += step;
  currentScale = Math.max(SCALE_CONFIG.MIN, Math.min(currentScale, SCALE_CONFIG.MAX));
  updateUI();
};

const onSmallerButtonClick = () => {
  changeScale(-SCALE_CONFIG.STEP);
};

const onBiggerButtonClick = () => {
  changeScale(SCALE_CONFIG.STEP);
};

const initScale = () => {
  scaleControlField = document.querySelector('.img-upload__scale');
  smallerButton = scaleControlField.querySelector('.scale__control--smaller');
  biggerButton = scaleControlField.querySelector('.scale__control--bigger');
  scaleValue = scaleControlField.querySelector('.scale__control--value');
  image = document.querySelector('.img-upload__preview').querySelector('img');

  currentScale = SCALE_CONFIG.DEFAULT;
  updateUI();

  smallerButton.addEventListener('click', onSmallerButtonClick);
  biggerButton.addEventListener('click', onBiggerButtonClick);
};

const resetScale = () => {
  currentScale = SCALE_CONFIG.DEFAULT;
  updateUI();
};

export { initScale, resetScale };
