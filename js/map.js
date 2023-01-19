import {addInactiveState} from './form.js';
import {getAnnouncements} from './markup-generation.js';

const COORDINATES_DEFAULT = {
  lat: 35.6895,
  lng: 139.692,
};
const MAP_ZOOM = 12;
const TILE_LAYER = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
const ATTRIBUTION = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';

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

// иконка для похожего объявления
const normalPinIcon = L.icon({
  iconUrl: './img/pin.svg',
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});

// создаёт маркер
const mainPinMarker = L.marker(
  COORDINATES_DEFAULT,
  {
    draggable: true,
    icon: mainPinIcon,
  },
);


// создаёт отдельный слой на карте и добавляет его туда
const markerGroup = L.layerGroup();

// добавляет на карту метки объявлений "обычные"
const normalPinMarkers = (ads) => {
  const normalmarker = L.marker(
    {
      lat: ads.location.lat,
      lng: ads.location.lng,
    },
    {
      icon: normalPinIcon,
    },
  );

  normalmarker
    .addTo(markerGroup)
    .bindPopup(() => getAnnouncements(ads));
};

// сброс по умолчанию карты
const resetMap = (ads) => {
  mainPinMarker.setLatLng(COORDINATES_DEFAULT);
  markerGroup.closePopup();
  markerGroup.clearLayers();
  ads.forEach((ad) => normalPinMarkers(ad));
};

// инициализация карты
const initMap = (ads) => {
  // создаёт карту
  const map = L.map('map-canvas')
    .on('load', () => {
      addInactiveState(true);
      fromAddress.value = `${COORDINATES_DEFAULT.lat}, ${COORDINATES_DEFAULT.lng}`;
    })
    .setView(COORDINATES_DEFAULT, MAP_ZOOM);

  ads = ads.slice(0, 10);
  resetMap(ads);

  // добавляет координаты в поле Адрес
  mainPinMarker.on('moveend', (evt) => {
    fromAddress.value = `${evt.target.getLatLng().lat.toFixed(5)}, ${evt.target.getLatLng().lng.toFixed(5)}`;
    map.setView(evt.target.getLatLng(), MAP_ZOOM);
  });
  form.addEventListener('reset', () => resetMap(ads));

  // добавляет маркер на карту
  mainPinMarker.addTo(map);
  markerGroup.addTo(map);
  tileLayer.addTo(map);
};

export {initMap};
