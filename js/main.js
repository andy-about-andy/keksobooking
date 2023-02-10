import {addInactiveState, getFormValidation} from './form.js';
import {initMap} from './map.js';
import {getData} from './api.js';
import {showAlert} from './util.js';
import {initFilters, activateFilter} from './filters.js';

addInactiveState(false);

getData((newAds) => {
  initMap(newAds);
  activateFilter(newAds);
  initFilters();
},
() => {
  showAlert('Ошибка сети. Обновите страницу!');
});

getFormValidation(addInactiveState);
