const FILE_TYPES =['gif', 'jpg', 'jpeg', 'png', 'webp', 'svg'];

const avatarFileChooser = document.querySelector('.ad-form__field input[type=file]');
const avatarPrewiew = document.querySelector('.ad-form-header__preview img');
const photoFileChooser = document.querySelector('.ad-form__upload input[type=file]');
const photoPrewiew = document.querySelector('.ad-form__photo');

// функция для загрузки фото в поле "аватар"
const onAvatarChange = () => {
  const avatarFile = avatarFileChooser.files[0];
  const avatarName = avatarFile.name.toLowerCase();

  const matches = FILE_TYPES.some((it) => avatarName.endsWith(it));

  if (matches) {
    avatarPrewiew.src = URL.createObjectURL(avatarFile);
  }
};

// функция для загрузки фотографии для жилья
const onPhotoChange = () => {
  const photoFile = photoFileChooser.files[0];
  const photoName = photoFile.name.toLowerCase();

  const matches = FILE_TYPES.some((it) => photoName.endsWith(it));

  if (matches) {
    const photo = document.createElement('img');
    photo.style.width = '70px';
    photo.style.height = '70px';
    photo.src = URL.createObjectURL(photoFile);
    photoPrewiew.append(photo);
  }
};

// обработчики событий на скрытые input для загрузки файлов
avatarFileChooser.addEventListener('change', onAvatarChange);
photoFileChooser.addEventListener('change', onPhotoChange);

// функуции сброса всех фото
const resetPhotos = () => {
  avatarPrewiew.src = 'img/muffin-grey.svg';
  avatarPrewiew.style.width = '40px';
  avatarPrewiew.style.height = '44px';
  photoPrewiew.textContent = '';
};

export {resetPhotos};
