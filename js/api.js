import {showAlert} from './util.js';

const URL_GET = 'https://26.javascript.pages.academy/keksobooking/data';
const URL_SEND = 'https://26.javascript.pages.academy/keksobooking';

const getData = async (onSuccess) => {
  try {
    const response = await fetch(URL_GET);
    if (!response.ok) {
      throw new Error('Не удалось загрузить данные объявлений');
    }
    const data = await response.json();
    onSuccess(data);
  } catch (error) {
    showAlert('Ошибка сети. Обновите страницу!');
  }
};

const sendData = async (onSuccess, onFail, body) => {
  try {
    const response = await fetch(URL_SEND,
      {
        method: 'POST',
        body,
      },
    );

    if (!response.ok) {
      throw new Error('Не удалось отправить форму объявления. Попробуйте ещё раз!');
    }
    onSuccess();
  } catch (error) {
    onFail('Не удалось отправить форму объявления. Попробуйте ещё раз!');
  }
};

export {getData, sendData};
