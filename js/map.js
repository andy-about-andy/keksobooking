import {addInactiveState} from './form.js';
import {getAnnouncements} from './markup-generation.js';

const COORDINATES_DEFAULT = {
  lat: 35.6895,
  lng: 139.692,
};
const MAP_ZOOM = 12;
const TILE_LAYER = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
const ATTRIBUTION = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';

const NUMBER_ADS_SHOWN = 10;

let map = undefined;

// создаёт отдельный слой на карте и добавляет его туда
const markerGroup = L.layerGroup();

const form = document.querySelector('.ad-form');
const fromAddress = form.querySelector('#address');

// добавляет open source изображение карты от OpenStreetMapб как слой на карту
const tileLayer = L.tileLayer(
  TILE_LAYER,
  {
    attribution: ATTRIBUTION,
  },
);

// заменяет иконку по умолчанию на свою
const mainPinIcon = L.icon({
  iconUrl: './img/main-pin.svg',
  iconSize: [52, 52],
  iconAnchor: [26, 52],
});

// создаёт маркер
const mainPinMarker = L.marker(
  COORDINATES_DEFAULT,
  {
    draggable: true,
    icon: mainPinIcon,
  },
);

// иконка для похожего объявления
const normalPinIcon = L.icon({
  iconUrl: './img/pin.svg',
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});

const getMap = () => {
  if (!map) {
    map = L.map('map-canvas')
      .on('load', () => {
        addInactiveState(true);
        fromAddress.value = `${COORDINATES_DEFAULT.lat}, ${COORDINATES_DEFAULT.lng}`;
      })
      .setView(COORDINATES_DEFAULT, MAP_ZOOM);
  }
  return map;
};

// добавляет на карту метки объявлений "обычные"
const normalPinMarkers = (ads) => {
  const normalsMarkers = L.marker(
    {
      lat: ads.location.lat,
      lng: ads.location.lng
    },
    {
      icon: normalPinIcon,
    },
  );
  normalsMarkers
    .addTo(markerGroup)
    .bindPopup(() => getAnnouncements(ads));
};

// сброс карты (отрисовка новых меток)
const resetMap = (ads) => {
  getMap().setView(COORDINATES_DEFAULT, MAP_ZOOM);
  mainPinMarker.setLatLng(COORDINATES_DEFAULT);
  markerGroup.closePopup();
  markerGroup.clearLayers();
  ads.forEach((ad) => normalPinMarkers(ad));
};

// добавляет координаты в поле Адрес (координаты)
mainPinMarker.on('moveend', (evt) => {
  fromAddress.value = `${evt.target.getLatLng().lat.toFixed(5)}, ${evt.target.getLatLng().lng.toFixed(5)}`;
  map.setView(evt.target.getLatLng(), MAP_ZOOM);
});

// инициализация карты
const initMap = (ads) => {
  getMap();
  addInactiveState(true);
  resetMap(ads.slice(0, NUMBER_ADS_SHOWN));

  // добавляет маркер на карту
  mainPinMarker.addTo(map);
  markerGroup.addTo(map);
  tileLayer.addTo(map);

  form.addEventListener('reset', () => resetMap(ads));
};

export {initMap, resetMap, normalPinMarkers, NUMBER_ADS_SHOWN};
