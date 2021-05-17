'use strict';

import {AdForm} from './ad-form.js';
import {FilterForm} from './filter-form.js';
import {Map} from './map.js';
import {TestHousing} from './data/test-data.js';

const adForm = new AdForm();
const filterForm = new FilterForm();

adForm.clear();
adForm.toggleActive(false);
filterForm.toggleActive(false);

const map = new Map({
  onLoad: () => {
    adForm.toggleActive(true);
    filterForm.toggleActive(true);
  },
  onLocationChange: (location) => {
    adForm.setLocation(location);
  },
});

const housings = new Array(10).fill(null).map(() => new TestHousing());
map.createHousingsMarkers(housings);
