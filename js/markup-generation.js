const TYPE_HOUSING = {
  flat: 'Квартира',
  bungalow: 'Бунгало',
  house: 'Дом',
  palace: 'Дворец',
  hotel: 'Отель',
};

const IMG_WIDTH = '45';
const IMG_HEIGHT = '40';

// const mapCanvas = document.querySelector('#map-canvas');
const cardElementTemplate = document.querySelector('#card')
  .content
  .querySelector('.popup');

// Генерирует элемент "img" для фотографий жилья
const getPhotos = (photos, element) => {
  const photoContainer = element.querySelector('.popup__photos');
  photoContainer.textContent = '';
  photos.forEach((photo) => {
    const img = document.createElement('img');
    img.classList.add('popup__photo');
    img.src = photo;
    img.width = IMG_WIDTH;
    img.height = IMG_HEIGHT;
    img.alt = 'Фотография жилья';
    photoContainer.append(img);
  });
};

// Генерирует карточку одного (первого) объявления на место карты
const getAnnouncements = (dataAnnouncements) => {
  // const announcementFragment = document.createDocumentFragment();

  // dataAnnouncements.forEach(({author, offer}) => {
  const announcement = cardElementTemplate.cloneNode(true);

  // Обязательные данные описания объявления
  announcement.querySelector('.popup__title').textContent = dataAnnouncements.offer.title;
  announcement.querySelector('.popup__text--address').textContent = dataAnnouncements.offer.address;
  announcement.querySelector('.popup__text--price').textContent = `${dataAnnouncements.offer.price} ₽/ночь`;
  announcement.querySelector('.popup__type').textContent = TYPE_HOUSING[dataAnnouncements.offer.type];
  getPhotos(dataAnnouncements.offer.photos, announcement);

  // Необязательные данные описания объявления
  if (dataAnnouncements.offer.rooms && dataAnnouncements.offer.guests) {
    announcement.querySelector('.popup__text--capacity').textContent = `${dataAnnouncements.offer.rooms} комнаты для ${dataAnnouncements.offer.guests} гостей`;
  } else {
    announcement.querySelector('.popup__text--capacity').textContent = '';
  }

  if (dataAnnouncements.offer.checkin && dataAnnouncements.offer.checkout) {
    announcement.querySelector('.popup__text--time').textContent = `Заезд после ${dataAnnouncements.offer.checkin}, выезд до ${dataAnnouncements.offer.checkout} гостей`;
  } else {
    announcement.querySelector('.popup__text--time').textContent = '';
  }

  if (dataAnnouncements.offer.features) {
    announcement.querySelector('.popup__features').textContent = dataAnnouncements.offer.features;
  } else {
    announcement.querySelector('.popup__features').textContent = '';
  }

  if (dataAnnouncements.offer.description) {
    announcement.querySelector('.popup__description').textContent = dataAnnouncements.offer.description;
  } else {
    announcement.querySelector('.popup__description').textContent = '';
  }

  if (dataAnnouncements.author.avatar) {
    announcement.querySelector('.popup__avatar').src = dataAnnouncements.author.avatar;
  } else {
    announcement.querySelector('.popup__avatar').src = 'img/avatars/default.png';
  }

  return announcement;
  // announcementFragment.append(announcement);


  // mapCanvas.append(announcementFragment.childNodes[1]);
};

export {getAnnouncements};
