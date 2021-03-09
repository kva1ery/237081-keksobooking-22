'use strict';

const TOKYO_LATITUDE = 35.685257;
const TOKYO_LONGITUDE = -220.247426;

const map = L.map('map-canvas')
  .setView({
    lat: TOKYO_LATITUDE,
    lng: TOKYO_LONGITUDE,
  }, 11);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  },
).addTo(map);
