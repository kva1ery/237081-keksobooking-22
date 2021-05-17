'use strict';

import {Card} from './card.js';

const TOKYO_LATITUDE = 35.685257;
const TOKYO_LONGITUDE = 139.75146;
const MAP_ZOOM = 13;

const L = window.L;

/**
 * class for create the map and managing its behavior.
 * @param {object} properties may content callback functions for map events:
 *  properties.onLoad called by after the map initialize;
 *  properties.onLocationChange called by after the moved the address marker.
 * @constructor
 */
const Map = function (properties = {}) {

  const markers = [];

  /**
   * Creates markers for housings on the map.
   * @param housings
   */
  this.createHousingsMarkers = (housings) => {
    housings.forEach((housing) => {
      const card = new Card(housing);
      const marker = createMarker(housing.location, card.render());
      markers.push(marker);
    });
  };

  const createMap = () => {
    const map = L.map('map-canvas')
      .on('load', () => {
        if (properties.onLoad) {
          properties.onLoad();
        }
      })
      .setView({
        lat: TOKYO_LATITUDE,
        lng: TOKYO_LONGITUDE,
      }, MAP_ZOOM);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      },
    ).addTo(map);
    return map;
  };

  const returnLocation = (location) => {
    if (properties.onLocationChange) {
      properties.onLocationChange(location);
    }
  }

  const createMainMarker = () => {
    const icon = L.icon({
      iconUrl: 'img/main-pin.svg',
      iconSize: [52, 52],
      iconAnchor: [26, 52],
    });

    const marker = L.marker(
      {
        lat: TOKYO_LATITUDE,
        lng: TOKYO_LONGITUDE,
      },
      {
        draggable: true,
        icon: icon,
      },
    ).on('moveend', (evt) => {
      returnLocation(evt.target.getLatLng());
    });

    marker.addTo(map);

    returnLocation({
      lat: TOKYO_LATITUDE,
      lng: TOKYO_LONGITUDE,
    });
  };

  const createMarker = (location, popupContent) => {
    const icon = L.icon({
      iconUrl: 'img/pin.svg',
      iconSize: [52, 52],
      iconAnchor: [26, 52],
    });

    const marker = L.marker(
      {
        lat: location.x,
        lng: location.y,
      },
      {
        icon: icon,
      },
    );

    marker
      .addTo(map)
      .bindPopup(popupContent);

    return marker;
  };

  const map = createMap();
  createMainMarker();
};

export {Map};
