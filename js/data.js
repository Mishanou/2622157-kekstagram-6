import { getRandomInteger, getRandomArrayElement } from './utils';

const NAMES = [
  'User',
  'Dude',
  'Torontotokyo',
  'Jesus',
  'CJ',
  'Mr.Robot',
  'Anonymous',
  'Travis Scott'
];

const DESCRIPTIONS = [
  'Прекрасный день для фото',
  'Захватывающий момент',
  'Невероятные эмоции',
  'Памятное событие',
  'Великолепный пейзаж'
];

const MESSAGES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

const generateMessage = () => {
  const count = getRandomInteger(1, 2);
  const selectedMessages = [];

  for (let i = 0; i < count; i++) {
    selectedMessages.push(getRandomArrayElement(MESSAGES));
  }

  return selectedMessages.join(' ');
};

const generateComments = (count) => {
  const comments = [];

  for (let i = 0; i < count; i++) {
    comments.push({
      id: crypto.randomUUID(),
      avatar: `img/avatar-${getRandomInteger(1, 6)}.svg`,
      message: generateMessage(),
      name: getRandomArrayElement(NAMES)
    });
  }

  return comments;
};

const generatePhotos = (count) => {
  const photos = [];

  for (let i = 1; i <= count; i++) {
    photos.push({
      id: crypto.randomUUID(),
      url: `photos/${i}.jpg`,
      description: getRandomArrayElement(DESCRIPTIONS),
      likes: getRandomInteger(15, 200),
      comments: generateComments(getRandomInteger(0, 30))
    });
  }

  return photos;
};

export {generatePhotos};
