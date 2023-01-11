const form = document.querySelector('.ad-form');
// const elementsForm = document.querySelectorAll('fieldset', 'select', '.map__filters');
const elementsForm = document.querySelectorAll('fieldset', 'select');
const mapFilter = document.querySelector('.map__filters');


const addInactiveState = (status) => {
  if (status === false) {
    form.classList.add('ad-form--disabled');
    mapFilter.classList.add('map__filters--disabled');
    elementsForm.forEach((element) => {
      element.disabled = true;
    });
  } else {
    form.classList.remove('ad-form--disabled');
    mapFilter.classList.remove('map__filters--disabled');
    elementsForm.forEach((element) => {
      element.disabled = false;
    });
  }
};

export {addInactiveState};
