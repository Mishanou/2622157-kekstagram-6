import { isEscKey } from './utils.js';
import { resetScale } from './scale.js';
import { resetEffects } from './effects.js';

const form = document.querySelector('#upload-select-image');
const uploadInput = form.querySelector('#upload-file');
const overlay = form.querySelector('.img-upload__overlay');
const closeButton = overlay.querySelector('#upload-cancel');
const body = document.querySelector('body');
const hashtagInput = overlay.querySelector('.text__hashtags');
const commentInput = overlay.querySelector('.text__description');

const openForm = () => {
  overlay.classList.remove('hidden');
  body.classList.add('modal-open');
  document.addEventListener('keydown', onDocumentKeydown);

  overlay.dispatchEvent(new CustomEvent('open'));
};

const closeForm = () => {
  overlay.classList.add('hidden');
  body.classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeydown);

  form.reset();
  uploadInput.value = '';
  resetScale();
  resetEffects();
  hashtagInput.value = '';
  commentInput.value = '';

  overlay.dispatchEvent(new CustomEvent('close'));
};

function onDocumentKeydown(evt) {
  if (isEscKey(evt) && !evt.target.closest('.text__hashtags, .text__description')) {
    evt.preventDefault();
    closeForm();
  }
}

uploadInput.addEventListener('change', () => {
  openForm();
});

closeButton.addEventListener('click', (evt) => {
  evt.preventDefault();
  closeForm();
});

form.addEventListener('reset', () => {
  closeForm();
});

export { openForm, closeForm };
