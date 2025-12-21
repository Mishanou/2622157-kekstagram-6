import { validateHashtagFormat, validateHashtagUniqueness, validateHashtagCount, validateComment, MAX_COMMENT_LENGTH, MAX_HASHTAGS } from './form-validation.js';
import { initScale, resetScale } from './scale.js';
import { initEffects, resetEffects } from './effects.js';
import { sendData } from './api.js';
import { showSuccessMessage, showErrorMessage } from './messages.js';
import { closeForm } from './form-modal.js';

const FILE_TYPES = ['jpg', 'jpeg', 'png'];

const form = document.querySelector('#upload-select-image');
const overlay = form.querySelector('.img-upload__overlay');
const submitButton = form.querySelector('#upload-submit');
const hashtagInput = overlay.querySelector('.text__hashtags');
const commentInput = overlay.querySelector('.text__description');
const imagePreview = document.querySelector('.img-upload__preview img');

const SubmitButtonText = {
  IDLE: 'Опубликовать',
  SENDING: 'Публикую...'
};

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

  pristine.addValidator(hashtagInput, validateHashtagFormat, 'Хэштеги должны содержать только буквы/цифры, не больше 19 символов', 1, true);
  pristine.addValidator(hashtagInput, validateHashtagUniqueness, 'Хэштеги должны быть уникальными (регистр не учитывается)', 2, true);
  pristine.addValidator(hashtagInput, validateHashtagCount, `Не более ${MAX_HASHTAGS} хэштегов`, 3, true);
  pristine.addValidator(commentInput, validateComment, `Длина комментария не должна превышать ${MAX_COMMENT_LENGTH} символов`, 1, true);
};

const blockSubmitButton = () => {
  submitButton.disabled = true;
  submitButton.textContent = SubmitButtonText.SENDING;
};

const unblockSubmitButton = () => {
  submitButton.disabled = false;
  submitButton.textContent = SubmitButtonText.IDLE;
};

const resetForm = () => {
  resetScale();
  resetEffects();
  hashtagInput.value = '';
  commentInput.value = '';
  if (pristine) {
    pristine.destroy();
    pristine = null;
  }
  form.querySelector('#upload-file').value = '';
  imagePreview.src = 'img/upload-default-image.jpg';
};

const setPhoto = () => {
  const fileChooser = document.querySelector('#upload-file');

  fileChooser.addEventListener('change', () => {
    const file = fileChooser.files[0];
    const fileName = file.name.toLowerCase();

    const isMatch = FILE_TYPES.some((it) => fileName.endsWith(it));

    if (isMatch) {
      imagePreview.src = URL.createObjectURL(file);
    }
  });
};

const initFormHandler = () => {
  setPhoto();

  overlay.addEventListener('open', () => {
    createPristine();
    initScale();
    initEffects();
  });

  overlay.addEventListener('close', resetForm);

  form.addEventListener('submit', (evt) => {
    evt.preventDefault();

    const isValid = pristine.validate();
    if (isValid) {
      blockSubmitButton();
      const formData = new FormData(form);

      sendData(formData)
        .then(() => {
          closeForm();
          showSuccessMessage();
        })
        .catch(() => {
          showErrorMessage('Не удалось отправить форму. Попробуйте ещё раз');
        })
        .finally(() => {
          unblockSubmitButton();
        });
    }
  });

  form.addEventListener('reset', () => {
    resetForm();
    closeForm();
  });
};

export { initFormHandler };
