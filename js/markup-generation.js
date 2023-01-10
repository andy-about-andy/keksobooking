const TYPE_HOUSING = {
  flat: 'Квартира',
  bungalow: 'Бунгало',
  house: 'Дом',
  palace: 'Дворец',
  hotel: 'Отель',
};

const IMG_WIDTH = '45';
const IMG_HEIGHT = '40';

const mapCanvas = document.querySelector('#map-canvas');
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
  const announcementFragment = document.createDocumentFragment();

  dataAnnouncements.forEach(({author, offer}) => {
    const announcement = cardElementTemplate.cloneNode(true);

    announcement.querySelector('.popup__title').textContent = offer.title;
    announcement.querySelector('.popup__text--address').textContent = offer.address;
    announcement.querySelector('.popup__text--price').textContent = `${offer.price} ₽/ночь`;
    announcement.querySelector('.popup__type').textContent = TYPE_HOUSING[offer.type];
    announcement.querySelector('.popup__text--capacity').textContent = `${offer.rooms} комнаты для ${offer.guests} гостей`;
    announcement.querySelector('.popup__text--time').textContent = `Заезд после ${offer.checkin}, выезд до ${offer.checkout} гостей`;
    announcement.querySelector('.popup__features').textContent = offer.features;
    announcement.querySelector('.popup__description').textContent = offer.description;
    getPhotos(offer.photos, announcement);
    announcement.querySelector('.popup__avatar').src = author.avatar;

    announcementFragment.append(announcement);
  });

  mapCanvas.append(announcementFragment.childNodes[1]);
};

export {getAnnouncements};
