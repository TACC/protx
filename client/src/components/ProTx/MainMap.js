import React, { useEffect } from 'react';
import MapProviders from "./MapProviders";
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

    const map = L.map(mapContainer).setView(
      [initialState.lat, initialState.lng],
      initialState.zoom
    );

    // Create Layers Control.
    const { providers, layers: baseMaps } = MapProviders();
    providers[3].addTo(map);
    const overlayMaps = {}
    L.control.layers(baseMaps, overlayMaps).addTo(map);

  }, [mapContainer]);

  return <div className="map-container" ref={el => (mapContainer = el)} />;
}

export default MainMap;
