const URL_GET = 'https://26.javascript.htmlacademy.pro/keksobooking/data';
const URL_SEND = 'https://26.javascript.htmlacademy.pro/keksobooking';

const getData = async (onSuccess, onFail) => {
  try {
    const response = await fetch(URL_GET);
    if (!response.ok) {
      throw new Error('Не удалось загрузить данные объявлений');
    }
    const data = await response.json();
    onSuccess(data);
  } catch (error) {
    onFail(error.message);
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
    onFail(error.message);
  }
};

export {getData, sendData};
