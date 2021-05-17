'use strict';

/**
 * class for managing the behavior of the filter form.
 * @constructor
 */
const FilterForm = function () {
  const form = document.querySelector('.map__filters');

  /**
   * Activates or Deactivates the form, on depending the active param.
   * @param {boolean} active
   */
  this.toggleActive = (active = true) => {
    form.classList.toggle('ad-form--disabled', !active);

    const fieldsets = form.querySelectorAll('fieldset');
    fieldsets.forEach((fieldset) => {
      fieldset.disabled = !active;
    });

    const selects = form.querySelectorAll('select');
    selects.forEach((select) => {
      select.disabled = !active;
    });
  };
}

export {FilterForm};
