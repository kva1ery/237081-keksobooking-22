'use strict';

import {HOUSING_TYPES} from './data/references.js'

const COORDS_DIGITS = 5

const ROOMS_CAPACITY = {
  1: {
    capacity: ['1'],
    errorMessage: 'В одной комнате может жить только 1 гость',
  },
  2: {
    capacity: ['1', '2'],
    errorMessage: 'В двух комнатах могут жить 1 или 2 гостя',
  },
  3: {
    capacity: ['1', '2', '3'],
    errorMessage: 'В трёх комнатах могут жить от 1 до 3 гостей',
  },
  100: {
    capacity: ['0'],
    errorMessage: '100 комнат не для гостей ',
  },
}

/**
 * class for managing the behavior of the ad form.
 * @constructor
 */
const AdForm = function () {
  const form = document.querySelector('.ad-form');
  const housingTypeInput = form.querySelector('#type');
  const priceInput = form.querySelector('#price');
  const timeInInput = form.querySelector('#timein');
  const timeOutInput = form.querySelector('#timeout');
  const addressInput = form.querySelector('#address');
  const titleInput = form.querySelector('#title');
  const roomNumberInput = form.querySelector('#room_number');
  const capacityInput = form.querySelector('#capacity');
  const clearButton = form.querySelector('.ad-form__reset');

  addressInput.readOnly = true;

  /**
   * Clears the form.
   */
  this.clear = () => {
    form.reset();
    setMinPrice(getMinPriceByHousingType(housingTypeInput.value));
  };

  /**
   * Activates or Deactivates the form, on depending the active param.
   * @param {boolean} active
   */
  this.toggleActive = (active = true) => {
    if (active) {
      form.classList.remove('ad-form--disabled');
    } else {
      form.classList.add('ad-form--disabled');
    }

    const fieldsets = form.querySelectorAll('fieldset');
    fieldsets.forEach((fieldset) => {
      fieldset.disabled = !active;
    });
  };

  /**
   * Sets the location into the advertising (sets the coordinations into the address field).
   * @param location
   */
  this.setLocation = (location) => {
    addressInput.value = `${location.lat.toFixed(COORDS_DIGITS)}, ${location.lng.toFixed(COORDS_DIGITS)}`;
  };

  const setMinPrice = (minPrice) => {
    priceInput.placeholder = minPrice;
    priceInput.min = minPrice;
  };

  const getMinPriceByHousingType = (housingType) => {
    return HOUSING_TYPES[housingType].minPrice;
  };

  housingTypeInput.addEventListener('change', () => {
    setMinPrice(getMinPriceByHousingType(housingTypeInput.value));
  });

  timeInInput.addEventListener('change', () => {
    timeOutInput.value = timeInInput.value;
  });

  timeOutInput.addEventListener('change', () => {
    timeInInput.value = timeOutInput.value;
  });

  clearButton.addEventListener('click', () => {
    this.clear();
  });

  titleInput.addEventListener('invalid', () => {
    if (titleInput.validity.tooShort) {
      titleInput.setCustomValidity('Заголовок не может быть короче 30-ти символов');
    } else if (titleInput.validity.tooLong) {
      titleInput.setCustomValidity('Заголовок не должен быть длинее 100 символов');
    } else if (titleInput.validity.valueMissing) {
      titleInput.setCustomValidity('Заголовок обязателен для заполнения');
    } else {
      titleInput.setCustomValidity('');
    }
  });

  priceInput.addEventListener('invalid', () => {
    if (priceInput.validity.rangeUnderflow) {
      priceInput.setCustomValidity(`Цена за ночь не может быть меньше ${priceInput.min} рублей`);
    } else if (priceInput.validity.rangeOverflow) {
      priceInput.setCustomValidity('Цена за ночь не может быть больше 1000000 рублей');
    } else if (priceInput.validity.valueMissing) {
      priceInput.setCustomValidity('Цена за ночь обязателена для заполнения');
    } else {
      priceInput.setCustomValidity('');
    }
  });

  const capacityValidate = () => {
    const rooms = roomNumberInput.value;
    const capacity = capacityInput.value;

    let isValid = true;
    if (!ROOMS_CAPACITY[rooms].capacity.includes(capacity)) {
      capacityInput.setCustomValidity(ROOMS_CAPACITY[rooms].errorMessage);
      isValid = false;
    } else {
      capacityInput.setCustomValidity('');
    }
    capacityInput.reportValidity();

    return isValid;
  };

  roomNumberInput.addEventListener('change', () => {
    capacityValidate();
  });

  capacityInput.addEventListener('change', () => {
    capacityValidate();
  });

  form.addEventListener('submit', (evt) => {
    if (!capacityValidate()) {
      evt.preventDefault();
    }
  });

}

export {AdForm};
