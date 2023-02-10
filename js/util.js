const ALERT_SHOW_TIME = 5000;
const TIMEOUT_DELAY = 500;

// случайное целое число от min до max включительно
// Функция взята из интернета и доработана
// Источник - https://github.com/you-dont-need/You-Dont-Need-Lodash-Underscore#_random
function getRandomPositiveInteger (a, b) {
  const lower = Math.ceil(Math.min(Math.abs(a), Math.abs(b)));
  const upper = Math.floor(Math.max(Math.abs(a), Math.abs(b)));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
}

// случайное число с плавающей точкой из переданного диапазона включительно
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

// показ ошибки в случае проблем при взаимодействии с сервером
const showAlert = (message) => {
  const alertContainer = document.createElement('div');
  alertContainer.style.zIndex = '100';
  alertContainer.style.position = 'absolute';
  alertContainer.style.left = '0';
  alertContainer.style.top = '0';
  alertContainer.style.right = '0';
  alertContainer.style.padding = '10px 3px';
  alertContainer.style.fontSize = '30px';
  alertContainer.style.textAlign = 'center';
  alertContainer.style.backgroundColor = 'red';

  alertContainer.textContent = message;

  document.body.append(alertContainer);

  setTimeout(() => {
    alertContainer.remove();
  }, ALERT_SHOW_TIME);
};

// проверка нажатия клавиши Escape
const isEscapeKey = (evt) => evt.key === 'Escape';

// Функция для устранения дребезга
// Функция взята из интернета и доработана
// Источник - https://www.freecodecamp.org/news/javascript-debounce-example
function debounce (callback, timeoutDelay = TIMEOUT_DELAY) {
  let timeoutId;
  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
}

export {getRandomPositiveInteger, getRandomPositiveFloat, getNewArray, showAlert, isEscapeKey, debounce, TIMEOUT_DELAY};
