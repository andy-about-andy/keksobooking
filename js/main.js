// Случайное целое число от min до max включительно
// Функция взята из интернета и доработана
// Источник - https://github.com/you-dont-need/You-Dont-Need-Lodash-Underscore#_random
function getRandomPositiveInteger (a, b) {
  const lower = Math.ceil(Math.min(Math.abs(a), Math.abs(b)));
  const upper = Math.floor(Math.max(Math.abs(a), Math.abs(b)));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
}

// Случайное число с плавающей точкой из переданного диапазона включительно
// Функция взята из интернета и доработана
// Источник - https://github.com/you-dont-need/You-Dont-Need-Lodash-Underscore#_random
function getRandomPositiveFloat (a, b, digits = 1) {
  const lower = Math.min(Math.abs(a), Math.abs(b));
  const upper = Math.max(Math.abs(a), Math.abs(b));
  const result = Math.random() * (upper - lower) + lower;
  return +result.toFixed(digits);
}

// функция возвращает случайное значение из массива
const getRandomElement = (element) => {
  const randomElement = Math.floor(Math.random() * element.length);
  return element[randomElement];
};

// функция возвращает массив случайной длины из случайных неповторяющихся значений
const getNewArray = (array) => {
  const newArray = new Array (getRandomPositiveInteger(1, array.length)).fill(' ').map(() => (getRandomElement(array)));
  const elementArray = [...new Set(newArray)];
  return elementArray;
};

const TITLE = [
  'Заголовок 1',
  'Заголовок 2',
  'Заголовок 3',
  'Заголовок 4',
  'Заголовок 5',
  'Заголовок 6',
  'Заголовок 7',
  'Заголовок 8',
  'Заголовок 9',
  'Заголовок 10',
];

const TYPE = [
  'palace',
  'flat',
  'house',
  'bungalow',
  'hotel'
];

const CHECKIN = [
  '12:00',
  '13:00',
  '14:00',
];

const CHECKOUT = [
  '12:00',
  '13:00',
  '14:00',
];

const FEATURES = [
  'wifi',
  'dishwasher',
  'parking',
  'washer',
  'elevator',
  'conditioner',
];

const DESCRIPTION = [
  'Описание помещение 1',
  'Описание помещение 2',
  'Описание помещение 3',
  'Описание помещение 4',
  'Описание помещение 5',
  'Описание помещение 6',
  'Описание помещение 7',
  'Описание помещение 8',
  'Описание помещение 9',
  'Описание помещение 10',
];

const PHOTOS = [
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg',
];

const LAT_MIN = 35.65000;
const LAT_MAX = 35.70000;
const LNG_MIN = 139.70000;
const LNG_MAX = 139.80000;

const PRICE_MIN = 100;
const PRICE_MAX = 10000;

const ROOMS_MIN = 1;
const ROOMS_MAX = 5;

const GUESTS_MIN = 1;
const GUESTS_MAX = 10;

const NUMBER_GENERATION_OBJECTS = 10;
const NUMBER_DOTS_AFTER_POINT = 5;
const idArray = Array.from({length:10}, (_, k)=> ++k);

const createObject = () => {
  const zeroLength = 2;
  const id = `0${idArray.shift()}`;
  const idNew = id.slice(-zeroLength);

  return {
    author: [
      {avatar: `img/avatars/user${idNew}.png`},
    ],

    offer: [
      {
        title: TITLE[getRandomPositiveInteger(0, TITLE.length - 1)],
        address: `location.${getRandomPositiveFloat(LAT_MIN, LAT_MAX, NUMBER_DOTS_AFTER_POINT)}, location.${getRandomPositiveFloat(LNG_MIN, LNG_MAX, NUMBER_DOTS_AFTER_POINT)}`,
        price: getRandomPositiveInteger(PRICE_MIN, PRICE_MAX),
        type: TYPE[getRandomPositiveInteger(0, TYPE.length - 1)],
        rooms: getRandomPositiveInteger(ROOMS_MIN, ROOMS_MAX),
        guests: getRandomPositiveInteger(GUESTS_MIN, GUESTS_MAX),
        checkin: CHECKIN[getRandomPositiveInteger(0, CHECKIN.length - 1)],
        checkout: CHECKOUT[getRandomPositiveInteger(0, CHECKOUT.length - 1)],
        features: getNewArray(FEATURES),
        description: DESCRIPTION[getRandomPositiveInteger(0, DESCRIPTION.length - 1)],
        photos: getNewArray(PHOTOS),
      },
    ],

    location: [
      {
        lat: getRandomPositiveFloat(LAT_MIN, LAT_MAX, NUMBER_DOTS_AFTER_POINT),
        lng: getRandomPositiveFloat(LNG_MIN, LNG_MAX, NUMBER_DOTS_AFTER_POINT),
      },
    ],
  };
};

const generationObjects = Array.from({length: NUMBER_GENERATION_OBJECTS}, createObject);
console.log(generationObjects);
