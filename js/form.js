const form = document.querySelector('.ad-form');
const elementsForm = document.querySelectorAll('fieldset', 'select');
const mapFilter = document.querySelector('.map__filters');

const formTitle = form.querySelector('#title');
const formPrice = form.querySelector('#price');
const formRoomNumber = form.querySelector('#room_number');
const formCapacity = form.querySelector('#capacity');

const MIN_LENGTH_TITLE = 30;
const MAX_LENGTH_TITLE = 100;
const MAX_PRICE = 100000;
const ROOMS_CAPACITY = {
  '1': ['1'],
  '2': ['2', '1'],
  '3': ['3', '2', '1'],
  '100': ['0'],
};

// Активация и деактивация формы
const addInactiveState = (status) => {
  if (status === false) {
    form.classList.add('ad-form--disabled');
    mapFilter.classList.add('map__filters--disabled');
    elementsForm.forEach((element) => {
      element.disabled = true;
    });
  } else {
    form.classList.remove('ad-form--disabled');
    mapFilter.classList.remove('map__filters--disabled');
    elementsForm.forEach((element) => {
      element.disabled = false;
    });
  }
};

// Инициализируем библиотеку Pristine
const pristine = new Pristine(form, {
  classTo: 'ad-form__element',
  errorClass: 'ad-form__element--error',
  successClass: 'ad-form__element--succes',
  errorTextParent: 'ad-form__element',
  errorTextTag: 'div',
  errorTextClass: 'ad-form__element--text-error'
});

// Валидация формы

// Заголовок
// Проверка длины заголовка
const checkTitleLength = (value, min, max) => value.length >= min && value.length <= max;

pristine.addValidator(formTitle, (value) => checkTitleLength(value, MIN_LENGTH_TITLE, MAX_LENGTH_TITLE), `Заголовок может быть от ${MIN_LENGTH_TITLE} до ${MAX_LENGTH_TITLE} символов`);

// Цена за ночь
// Проверка цены
const checkPrice = (value, max) => value <= max;

pristine.addValidator(formPrice, (value) => checkPrice(value, MAX_PRICE), `Цена не может быть более ${MAX_PRICE}`);

// Количество комнат и количество мест
const valideteRoomNumberCapacity = () => ROOMS_CAPACITY[formRoomNumber.value].includes(formCapacity.value);
// Сообщение об ошраничениях по выбору помещений от количества человек
const getCapacityErrorMessage = () => `Размещение в ${formRoomNumber.value} ${formRoomNumber.value === '1' ? 'комнате' : 'комнатах'} ${formCapacity.value} ${formCapacity.value === '1' ? 'гостя' : 'гостей'} невозможно`;

pristine.addValidator(formRoomNumber, valideteRoomNumberCapacity, getCapacityErrorMessage);

// отправка формы после валидации
form.addEventListener('submit', (evt) => {
  evt.preventDefault();

  const isValid = pristine.validate();
  if (isValid) {
    form.submit();
  }
});

export {addInactiveState};
