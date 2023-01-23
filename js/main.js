import {addInactiveState, getFormValidation} from './form.js';
import {initMap} from './map.js';
import {getData} from './api.js';
import {showAlert} from './util.js';

addInactiveState(false);

getData((ads) => {
  initMap(ads);
},
() => {
  showAlert('Ошибка сети. Обновите страницу!');
});

getFormValidation();
