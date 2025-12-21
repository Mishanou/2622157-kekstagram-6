import { openPhoto } from './full-screen-photo.js';
import { getRandomElements, comparePhotosByComments, debounce } from './utils.js';

const UNIQUE_PHOTOS_COUNT = 10;

const drawThumbnails = (photos) => {
  const pictureTemplate = document.querySelector('#picture').content;
  const photosList = document.querySelector('.pictures');
  const fragment = document.createDocumentFragment();

  const existingPictures = photosList.querySelectorAll('.picture');
  existingPictures.forEach((picture) => picture.remove());

  photos.forEach((photo) => {
    const photoElement = pictureTemplate.cloneNode(true);
    const pictureLink = photoElement.querySelector('.picture');

    photoElement.querySelector('.picture__img').src = photo.url;
    photoElement.querySelector('.picture__img').alt = photo.description;
    photoElement.querySelector('.picture__likes').textContent = photo.likes;
    photoElement.querySelector('.picture__comments').textContent = photo.comments.length;

    pictureLink.addEventListener('click', (evt) => {
      evt.preventDefault();
      openPhoto(photo);
    });

    fragment.appendChild(photoElement);
  });
  photosList.append(fragment);
};

const renderPhotos = (photos) => {
  const filterButtons = document.querySelector('.img-filters');
  filterButtons.classList.remove('img-filters--inactive');
  const filtersForm = document.querySelector('.img-filters__form');
  const defaultButton = filtersForm.querySelector('#filter-default');
  const randomButton = filtersForm.querySelector('#filter-random');
  const discussedButton = filtersForm.querySelector('#filter-discussed');

  const originalPhotos = [...photos];

  drawThumbnails(originalPhotos);
  const debouncedDrawThumbnails = debounce(drawThumbnails, 500);

  defaultButton.addEventListener('click', (evt) => {
    evt.preventDefault();
    randomButton.classList.remove('img-filters__button--active');
    discussedButton.classList.remove('img-filters__button--active');
    defaultButton.classList.add('img-filters__button--active');
    debouncedDrawThumbnails(originalPhotos);
  });

  randomButton.addEventListener('click', (evt) => {
    evt.preventDefault();
    defaultButton.classList.remove('img-filters__button--active');
    discussedButton.classList.remove('img-filters__button--active');
    randomButton.classList.add('img-filters__button--active');
    const randomPhotos = getRandomElements(originalPhotos, UNIQUE_PHOTOS_COUNT);
    debouncedDrawThumbnails(randomPhotos);
  });

  discussedButton.addEventListener('click', (evt) => {
    evt.preventDefault();
    defaultButton.classList.remove('img-filters__button--active');
    randomButton.classList.remove('img-filters__button--active');
    discussedButton.classList.add('img-filters__button--active');
    const sortedPhotos = [...originalPhotos].sort(comparePhotosByComments);
    debouncedDrawThumbnails(sortedPhotos);
  });
};

export { renderPhotos };
