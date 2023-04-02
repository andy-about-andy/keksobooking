import {sendData} from './api.js';
import {resetMap} from './map.js';
import {blockSubmitButton, onSuccessSendForm, onErrorSendForm} from './popup-message.js';
import {resetFilters} from './filters.js';
import {resetPhotos} from './photo-upload.js';

const form = document.querySelector('.ad-form');
const elementsForm = document.querySelectorAll('fieldset', 'select');
const mapFilter = document.querySelector('.map__filters');

const formTitle = form.querySelector('#title');
const formPrice = form.querySelector('#price');
const sliderElement = form.querySelector('.ad-form__slider');
const formRoomNumber = form.querySelector('#room_number');
const formCapacity = form.querySelector('#capacity');
const formTypeHousing = form.querySelector('#type');
const formTimeIn = form.querySelector('#timein');
const formTimeOut = form.querySelector('#timeout');

const resetButtonElement = form.querySelector('.ad-form__reset');

const MIN_LENGTH_TITLE = 30;
const MAX_LENGTH_TITLE = 100;
const MAX_PRICE = 100000;
const ROOMS_CAPACITY = {
  '1': ['1'],
  '2': ['2', '1'],
  '3': ['3', '2', '1'],
  '100': ['0'],
};
const MIN_PRICE = {
  'bungalow': '0',
  'flat': '1000',
  'hotel': '3000',
  'house': '5000',
  'palace': '10000'
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
//-------------------------------------
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
// Сообщение об ограничениях по выбору помещений от количества человек
const getCapacityErrorMessage = () => `Размещение в ${formRoomNumber.value} ${formRoomNumber.value === '1' ? 'комнате' : 'комнатах'} ${formCapacity.value} ${formCapacity.value === '1' ? 'гостя' : 'гостей'} невозможно`;

pristine.addValidator(formRoomNumber, valideteRoomNumberCapacity, getCapacityErrorMessage);

// Тип жилья
// Валидация
const validatePrice = () => formPrice.value >= MIN_PRICE[formTypeHousing.value];
// Сообщение об ошибке валидации поля с ценой и типа жилья
const getPriceErrorMessage = () => {
  if (formPrice.value <= MIN_PRICE[formTypeHousing.value]) {
    return `Минимальная цена ${MIN_PRICE[formTypeHousing.value]}`;
  }
};
// функция изменения поля с выбором жилья
const onTypeHousingChange = () => {
  formPrice.min = MIN_PRICE[formTypeHousing.value];
  formPrice.placeholder = MIN_PRICE[formTypeHousing.value];
};
formTypeHousing.addEventListener('change', onTypeHousingChange);

pristine.addValidator(formPrice, validatePrice, getPriceErrorMessage);

// Время заезда и выезда
// Функции изменения поля времени
const onTimeInChange = () => {
  formTimeOut.value = formTimeIn.value;
};
const onTimeOutChange = () => {
  formTimeIn.value = formTimeOut.value;
};
// Функции синхронизации время выезда и время въезда
formTimeIn.addEventListener('change', onTimeInChange);
formTimeOut.addEventListener('change', onTimeOutChange);

// функция сброса всех параметров на странице (формы, карта)
const resetAllForms = (ads) => {
  resetMap(ads);
  form.reset();
  resetFilters();
};

// отправка формы после валидации
const getFormValidation = () => {
  form.addEventListener('submit', (evt) => {
    evt.preventDefault();

    const isValid = pristine.validate();
    if (isValid) {
      blockSubmitButton();
      sendData(
        onSuccessSendForm,
        onErrorSendForm,
        new FormData(form)
      );
    }
  });
};

// Слайдер
noUiSlider.create(sliderElement, {
  range: {
    min: 0,
    max: 100000,
  },
  start: MIN_PRICE[formTypeHousing.value],
  step: 1000,
  connect: 'lower',
  format: {
    to: function (value) {
      return value.toFixed(0);
    },
    from: function (value) {
      return parseFloat(value);
    },
  },
});
// изменение значения при использовании слайдера
sliderElement.noUiSlider.on('update', (value, handle) => {
  formPrice.value = value[handle];
});
// изменение значения при вводе в input
formPrice.addEventListener('change', function () {
  sliderElement.noUiSlider.set(this.value);
});

// сброс слайдера
function resetSlider() {
  sliderElement.noUiSlider.updateOptions({
    start: MIN_PRICE[formTypeHousing.value],
  });
}

// сброс по кнопке "очистить"
resetButtonElement.addEventListener('click', () => {
  resetPhotos();
  resetSlider();
});

export {addInactiveState, getFormValidation, resetAllForms, resetSlider};
