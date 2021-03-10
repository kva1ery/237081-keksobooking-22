'use strict';

import {HOUSING_TYPES} from './data/references.js'

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
  const clearButton = form.querySelector('.ad-form__reset');

  /**
   * Clears the form.
   */
  this.clear = () => {
    form.reset();
    setMinPrice(getMinPriceByHousingType(housingTypeInput.value));
  };

  // TODO Добавить описание
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

  // TODO добавить метод установки адреса

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
}

export {AdForm};
