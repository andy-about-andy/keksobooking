import {normalPinMarkers, resetMap, NUMBER_ADS_SHOWN} from './map.js';
import {debounce} from './util.js';

const DEFAULT_TYPE = 'any';

const PRICE_FILTER = {
  middle: 10000,
  high: 50000
};

const formFilter = document.querySelector('.map__filters');
const housingTypeElement = formFilter.querySelector('#housing-type');
const housingPriceElement = formFilter.querySelector('#housing-price');
const housingRoomsElement = formFilter.querySelector('#housing-rooms');
const housingGuestsElement = formFilter.querySelector('#housing-guests');

let ads = [];

// активация фильтра поиска жилья
const activateFilter = (data) => {
  ads = data;
  formFilter.classList.remove('.map__filters--disabled');
  [...formFilter.children].forEach((ad) => {
    ad.disabled = false;
  });
};

// фильтр "тип жилья"
const filteredHouseType = (type) => housingTypeElement.value === type.offer.type || housingTypeElement.value === DEFAULT_TYPE;

// фильтр "прайс"
const filteredPrice = (ad, price) => {
  switch (price) {
    case 'any':
      return true;
    case 'low':
      return ad.offer.price < PRICE_FILTER.middle;
    case 'middle':
      return (ad.offer.price < PRICE_FILTER.high && ad.offer.price >= PRICE_FILTER.middle);
    case 'high':
      return ad.offer.price >= PRICE_FILTER.high;
  }
};

// фильтр "количество комнат"
const filteredRooms = (rooms) => Number(housingRoomsElement.value) === rooms.offer.rooms || housingRoomsElement.value === DEFAULT_TYPE;

// фильтр "количество гостей"
const filteredGuests = (guests) => Number(housingGuestsElement.value) === guests.offer.guests || housingGuestsElement.value === DEFAULT_TYPE;

// фильтр "удобства"
const filteredFeatures = (feautres) => {
  const housingFeaturesElement = formFilter.querySelectorAll('.map__features :checked');

  if (housingFeaturesElement.length && feautres) {
    return Array.from(housingFeaturesElement).every((feature) => feautres.includes(feature.value));
  }
  return housingFeaturesElement.length === 0;
};

// подходящие под фильтры объявления
const filtersAds = () => {
  const selectedPrice = housingPriceElement.value;

  const filteredAds = [];
  for (const offer of ads) {
    if (filteredAds.length >= NUMBER_ADS_SHOWN) {
      break;
    }

    if (
      filteredHouseType(offer) &&
      filteredPrice(offer, selectedPrice) &&
      filteredRooms(offer) &&
      filteredGuests(offer) &&
      filteredFeatures(offer.offer.features)) {
      filteredAds.push(offer);
    }
  }
  return filteredAds;
};

// сброс фильтров поиска объявления
const resetFilters = () => {
  formFilter.reset();
  normalPinMarkers(ads.slice(0, NUMBER_ADS_SHOWN));
};

// показать объявления
const initFilters = () => formFilter.addEventListener('change', debounce(() => resetMap(filtersAds())));

export {
  initFilters,
  resetFilters,
  activateFilter
};
