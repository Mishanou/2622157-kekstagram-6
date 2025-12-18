import { getData } from './api.js';
import { drawThumbnails } from './thumbnails.js';
import { showErrorMessage } from './messages.js';

getData()
  .then((photos) => drawThumbnails(photos))
  .catch(() => {
    showErrorMessage('Не удалось загрузить данные. Попробуйте обновить страницу');
  });
