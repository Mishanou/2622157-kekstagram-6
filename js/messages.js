import { isEscKey } from './utils.js';

const body = document.querySelector('body');

const getMessageTemplate = (id) => {
  const template = document.querySelector(id);
  return template.content.cloneNode(true);
};

const onMessageEscKeydown = (evt) => {
  if (isEscKey(evt)) {
    evt.preventDefault();
    closeMessage();
  }
};

const onMessageClick = (evt) => {
  if (evt.target.closest('.success__inner') || evt.target.closest('.error__inner')) {
    return;
  }
  closeMessage();
};

let currentMessage = null;

function closeMessage () {
  if (currentMessage) {
    currentMessage.remove();
    currentMessage = null;
    document.removeEventListener('keydown', onMessageEscKeydown);
    document.removeEventListener('click', onMessageClick);
  }
}

const showSuccessMessage = () => {
  const successMessage = getMessageTemplate('#success');
  body.appendChild(successMessage);

  currentMessage = body.querySelector('.success');

  currentMessage.style.zIndex = '1000';

  const successButton = currentMessage.querySelector('.success__button');
  successButton.addEventListener('click', closeMessage);

  document.addEventListener('keydown', onMessageEscKeydown);
  document.addEventListener('click', onMessageClick);
};

const showErrorMessage = (message = 'Не удалось отправить форму. Попробуйте ещё раз') => {
  const errorMessage = getMessageTemplate('#error');
  body.appendChild(errorMessage);

  currentMessage = body.querySelector('.error');

  currentMessage.style.zIndex = '1000';

  const errorTitle = currentMessage.querySelector('.error__title');
  if (message) {
    errorTitle.textContent = message;
  }

  const errorButton = currentMessage.querySelector('.error__button');
  errorButton.addEventListener('click', closeMessage);

  document.addEventListener('keydown', onMessageEscKeydown);
  document.addEventListener('click', onMessageClick);
};

export { showSuccessMessage, showErrorMessage };
