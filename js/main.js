// Случайное целое число от min до max включительно
const randomInteger = (min, max) => {
  if (min < max && min >= 0 && max > 0) {
    return Math.floor(Math.random() * (max + 1 - min) + min);
  }
};

randomInteger(10, 70);

// Случайное число с плавающей точкой из переданного диапазона включительно
const randomNumber = (min, max, numberSimbols) => {
  if (min < max && min >= 0 && max > 0) {
    return (Math.random() * (max + 1 - min) + min).toFixed(numberSimbols);
  }
};

randomNumber(2, 30, 3);
