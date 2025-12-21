import { getData } from './api.js';
import { renderPhotos } from './thumbnails.js';
import { showErrorMessage } from './messages.js';

getData()
  .then((photos) => renderPhotos(photos))
  .catch(() => showErrorMessage('Не удалось загрузить данные. Попробуйте обновить страницу'));
