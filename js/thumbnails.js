import { generatePhotos } from './data.js';
import { openPhoto } from './full-screen-photo.js';

const drawThumbnails = () => {
  const photos = generatePhotos();
  const pictureTemplate = document.querySelector('#picture').content;
  const photosList = document.querySelector('.pictures');
  const fragment = document.createDocumentFragment();

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

export { drawThumbnails };
