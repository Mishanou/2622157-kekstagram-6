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

export { EFFECTS };
