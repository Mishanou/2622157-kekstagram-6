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

const EFFECTS = {
  none: {
    name: 'none',
    min: 0,
    max: 100,
    step: 1,
    unit: '',
    getFilterStyle: () => ''
  },
  chrome: {
    name: 'chrome',
    min: 0,
    max: 1,
    step: 0.1,
    unit: '',
    getFilterStyle: (value) => `grayscale(${value})`
  },
  sepia: {
    name: 'sepia',
    min: 0,
    max: 1,
    step: 0.1,
    unit: '',
    getFilterStyle: (value) => `sepia(${value})`
  },
  marvin: {
    name: 'marvin',
    min: 0,
    max: 100,
    step: 1,
    unit: '%',
    getFilterStyle: (value) => `invert(${value}%)`
  },
  phobos: {
    name: 'phobos',
    min: 0,
    max: 3,
    step: 0.1,
    unit: 'px',
    getFilterStyle: (value) => `blur(${value}px)`
  },
  heat: {
    name: 'heat',
    min: 1,
    max: 3,
    step: 0.1,
    unit: '',
    getFilterStyle: (value) => `brightness(${value})`
  }
};

export { NAMES, DESCRIPTIONS, MESSAGES, EFFECTS };
