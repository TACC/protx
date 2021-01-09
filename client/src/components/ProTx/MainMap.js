import React, { useEffect } from 'react';
import L from 'leaflet';
import './MainMap.css';
import 'leaflet/dist/leaflet.css';

function MainMap() {
  let mapContainer;

  useEffect(() => {
    const initialState = {
      lat: 32.7767,
      lng: -96.797,
      zoom: 12,
      minZoom: 5,
      maxZoom: 17
    };

    // eslint-disable-next-line no-unused-vars
    const map = L.map(mapContainer).setView(
      [initialState.lat, initialState.lng],
      initialState.zoom
    );

    const basemapOsm = L.tileLayer(
      'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      {
        attribution:
          'Map data: &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        minZoom: 0,
        maxZoom: 17,
        name: 'OSM - Default',
        type: 'png'
      }
    );

    basemapOsm.addTo(map);
  }, [mapContainer]);

  return <div className="map-container" ref={el => (mapContainer = el)} />;
}

export default MainMap;
