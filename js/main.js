const getRandomInteger = (min, max) => {
  const lower = Math.ceil(Math.min(Math.abs(min), Math.abs(max)));
  const upper = Math.floor(Math.max(Math.abs(min), Math.abs(max)));
  return Math.floor(Math.random() * (upper - lower + 1) + lower);
};

const PHOTOS_COUNT = 25;
const MESSAGES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

const NAMES = ['User', 'Dude', 'Torontotokyo', 'Jesus', 'CJ', 'Mr.Robot', 'Anonymous', 'Travis Scott'];
const DESCRIPTIONS = [
  'Прекрасный день для фото',
  'Захватывающий момент',
  'Невероятные эмоции',
  'Памятное событие',
  'Великолепный пейзаж'
];

const getRandomArrayElement = (elements) => elements[getRandomInteger(0, elements.length - 1)];

const generateMessage = () => {
  const count = getRandomInteger(1, 2);
  const selectedMessages = [];

  for (let i = 0; i < count; i++) {
    selectedMessages.push(getRandomArrayElement(MESSAGES));
  }

  return selectedMessages.join(' ');
};

let commentIdCounter = 1;
const generateUniqueCommentId = () => commentIdCounter++;

const generateComments = (count) => {
  const comments = [];
  for (let i = 0; i < count; i++) {
    comments.push({
      id: generateUniqueCommentId(),
      avatar: `img/avatar-${getRandomInteger(1, 6)}.svg`,
      message: generateMessage(),
      name: getRandomArrayElement(NAMES)
    });
  }
  return comments;
};

const photos = [];
for (let i = 1; i <= PHOTOS_COUNT; i++) {
  photos.push({
    id: i,
    url: `photos/${i}.jpg`,
    description: getRandomArrayElement(DESCRIPTIONS),
    likes: getRandomInteger(15, 200),
    comments: generateComments(getRandomInteger(0, 30))
  });
}
