import {isEscapeKey, showAlert} from './util.js';
import {resetAllForms, resetSlider} from './form.js';
import {getData} from './api.js';
import {resetPhotos} from './photo-upload.js';

const successPopup = document.querySelector('#success').content.querySelector('.success').cloneNode(true);
const errorPopup = document.querySelector('#error').content.querySelector('.error').cloneNode(true);
const errorCloseButton = errorPopup.querySelector('.error__button');
const bodyElement = document.querySelector('body');
const submitButton = document.querySelector('.ad-form__submit');


// Закрывает попапы по нажатию клавиши Esc
const onSuccessPopupEscKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeSuccessPopup();
  }
};

const onErrorPopupEscKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeErrorPopup();
  }
};

// Закрывает попапы по click
const onSuccessPopupClose = (evt) => {
  if (evt.target === successPopup) {
    closeSuccessPopup();
  }
};

const onErrorPopupClose = (evt) => {
  if (evt.target === errorPopup) {
    closeErrorPopup();
  }
};

// Показывает попап об успешной отправке объявления
const showSuccessPopup = () => {
  bodyElement.append(successPopup);
  document.addEventListener('click', onSuccessPopupClose);
  document.addEventListener('keydown', onSuccessPopupEscKeydown);
};

// Показывает попап об ошибке в отправке объявления
const showErrorPopup = () => {
  bodyElement.append(errorPopup);
  document.addEventListener('click', onErrorPopupClose);
  document.addEventListener('keydown', onErrorPopupEscKeydown);
  errorCloseButton.addEventListener('click', closeErrorPopup);
};

// Закрывает попап об успешной отправке объявления
function closeSuccessPopup () {
  successPopup.remove();
  document.removeEventListener('click', onSuccessPopupClose);
  document.removeEventListener('keydown', onSuccessPopupEscKeydown);
}

// Закрывает попап об ошибке в отправке объявления
function closeErrorPopup () {
  errorPopup.remove();
  document.removeEventListener('click', onErrorPopupClose);
  document.removeEventListener('keydown', onErrorPopupEscKeydown);
}

// блокирует кнопку "Отправить" пока не отправит
const blockSubmitButton = () => {
  submitButton.disable = true;
  submitButton.textContent = 'Публикую...';
};

// разблокирует кнопку "Отправить" после отправки
const unblockSubmitButton = () => {
  submitButton.disable = false;
  submitButton.textContent = 'Опубликовать';
};

// успешная отправка
const onSuccessSendForm = () => {
  showSuccessPopup();
  unblockSubmitButton();
  getData(resetAllForms, () => {
    showAlert('Ошибка сети. Обновите страницу!');
  });
  resetPhotos();
  resetSlider();
};

// ошибка при отправке
const onErrorSendForm = () => {
  showErrorPopup();
  unblockSubmitButton();
};

export {blockSubmitButton, onSuccessSendForm, onErrorSendForm};
