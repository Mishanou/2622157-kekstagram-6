import { validateHashtags, validateComment, MAX_COMMENT_LENGTH } from './form-validation.js';
import { initScale, resetScale } from './scale.js';
import { initEffects, resetEffects } from './effects.js';
import { isEscKey } from './utils.js';

const body = document.querySelector('body');
const form = document.querySelector('#upload-select-image');
const uploadInput = form.querySelector('#upload-file');
const overlay = form.querySelector('.img-upload__overlay');
const closeButton = overlay.querySelector('#upload-cancel');
const hashtagInput = overlay.querySelector('.text__hashtags');
const commentInput = overlay.querySelector('.text__description');
const submitButton = overlay.querySelector('#upload-submit');

let pristine = null;

const createPristine = () => {
  pristine = new Pristine(form, {
    classTo: 'img-upload__field-wrapper',
    errorClass: 'img-upload__field--invalid',
    successClass: 'img-upload__field--valid',
    errorTextParent: 'img-upload__field-wrapper',
    errorTextTag: 'span',
    errorTextClass: 'img-upload__error'
  });

  pristine.addValidator(
    hashtagInput,
    validateHashtags,
    'Хэштеги должны начинаться с #, содержать только буквы и цифры (максимум 19 символов), быть уникальными (не более 5 хэштегов)',
    2,
    true
  );

  pristine.addValidator(
    commentInput,
    validateComment,
    `Длина комментария не должна превышать ${MAX_COMMENT_LENGTH} символов`,
    2,
    true
  );
};

const updateSubmitButton = () => {
  if (pristine) {
    const isValid = pristine.validate();
    submitButton.disabled = !isValid;
  }
};

const onDocumentKeydown = (evt) => {
  if (isEscKey(evt) && (evt.target !== hashtagInput && evt.target !== commentInput)) {
    evt.preventDefault();
    closeForm();
  }
};

const openForm = () => {
  overlay.classList.remove('hidden');
  body.classList.add('modal-open');

  createPristine();
  updateSubmitButton();
  initScale();
  initEffects();

  document.addEventListener('keydown', onDocumentKeydown);
  hashtagInput.addEventListener('input', updateSubmitButton);
  commentInput.addEventListener('input', updateSubmitButton);
};

function closeForm () {
  overlay.classList.add('hidden');
  body.classList.remove('modal-open');

  form.reset();
  uploadInput.value = '';
  hashtagInput.value = '';
  commentInput.value = '';
  resetScale();
  resetEffects();

  document.removeEventListener('keydown', onDocumentKeydown);
  hashtagInput.removeEventListener('input', updateSubmitButton);
  commentInput.removeEventListener('input', updateSubmitButton);

  if (pristine) {
    pristine.destroy();
    pristine = null;
  }
}

const initFormHandler = () => {
  uploadInput.addEventListener('change', openForm);

  closeButton.addEventListener('click', (evt) => {
    evt.preventDefault();
    closeForm();
  });

  form.addEventListener('submit', (evt) => {
    if (!pristine || !pristine.validate()) {
      evt.preventDefault();

      if (pristine) {
        pristine.validate(true);
      }
    }
  });
};

export { initFormHandler };
