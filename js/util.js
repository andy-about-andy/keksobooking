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

export {getRandomPositiveInteger, getRandomPositiveFloat, getNewArray};
