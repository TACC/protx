import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import L from 'leaflet';
import 'leaflet.vectorgrid';
import { SectionMessage, LoadingSpinner, DropdownSelector } from '_common';
import MapProviders from './MapProviders';
import './MainMap.css';
import { OBSERVED_FEATURES } from './meta';
import './MainMap.module.scss';
import 'leaflet/dist/leaflet.css';

const coldToHotColors = [
  '#ffffb2',
  '#fed976',
  '#feb24c',
  '#fd8d3c',
  '#f03b20',
  '#bd0026'
];

function getColor(value) {
  if (value < 1) {
    return coldToHotColors[0];
  }
  if (value < 2) {
    return coldToHotColors[1];
  }
  if (value < 3) {
    return coldToHotColors[2];
  }
  if (value < 4) {
    return coldToHotColors[3];
  }
  if (value < 5) {
    return coldToHotColors[4];
  }
  return coldToHotColors[5];
}

const getContent = (properties, selectedYear) => {
  let content = '<pre>';
  const allowedProperties = ['GEOID10', selectedYear];
  Object.keys(properties).forEach(k => {
    if (allowedProperties.includes(k)) {
      const displayValue = properties[k] ? properties[k] : '------';
      content += `${k}: ${displayValue}\n`;
    }
  });
  content += '</pre>';
  return content;
};

let mapContainer;

function MainMap() {
  const dataServer = window.location.origin; // 'https://prod.cep.tacc.utexas.edu/'
  const dispatch = useDispatch();
  const { loading, error, data } = useSelector(state => state.protx);
  const [selectedGeography, setSelectedGeography] = useState('county');
  const [selectedYear, setSelectedYear] = useState('2019');
  const [layersControl, setLayersControl] = useState(null);
  const [dataLayer, setDataLayer] = useState(null);
  const [map, setMap] = useState(null);

  // Get systems and any other initial data we need from the backend
  useEffect(() => {
    dispatch({ type: 'FETCH_PROTX' });
  }, []);

  useEffect(() => {
    if (map || loading === true) {
      return;
    }
    const initialState = {
      lat: 31.0686,
      lng: -99.9018,
      zoom: 6,
      minZoom: 0,
      maxZoom: 12 // max zoom of generated tile sets
    };

    const newMap = L.map(mapContainer).setView(
      [initialState.lat, initialState.lng],
      initialState.zoom
    );
    // Create Layers Control.
    const { providers, layers: baseMaps } = MapProviders();
    providers[3].addTo(newMap);
    setLayersControl(L.control.layers(baseMaps).addTo(newMap));
    setMap(newMap);
  }, [loading, data, mapContainer]);

  useEffect(() => {
    const vectorTile = `${dataServer}/static/data/vector/${selectedGeography}/${selectedYear}/{z}/{x}/{y}.pbf`;
    if (map && layersControl) {
      const newDataLayer = L.vectorGrid
        .protobuf(vectorTile, {
          vectorTileLayerStyles: {
            single_layer: properties => {
              return {
                fillColor: getColor(2), // TODO getColor(properties[selectedYear]),
                fill: true,
                stroke: false
              };
            }
          },
          interactive: true,
          getFeatureId(f) {
            return f.properties.GEOID10;
          },
          maxNativeZoom: 12 // TODO update from tiles are be consistent in tile generation
        })
        .on('mouseover', e => {
          const { properties } = e.layer;
          // todo need to close when switching years
          L.popup()
            .setContent(getContent(properties, selectedYear))
            .setLatLng(e.latlng)
            .openOn(map);
        });
      if (dataLayer && layersControl) {
        // we will remove data layer from mapand from control
        layersControl.removeLayer(dataLayer);
        dataLayer.remove();
      }

      // add new data layer to map and controls
      newDataLayer.addTo(map);
      layersControl.addOverlay(newDataLayer, 'Data');
      setDataLayer(newDataLayer);
    }
  }, [selectedYear, selectedGeography, layersControl, map]);

  const changeGeography = event => {
    setSelectedGeography(event.target.value);
  };

  const changeYear = event => {
    setSelectedYear(event.target.value);
  };

  if (error) {
    return (
      <div styleName="error">
        <SectionMessage type="warn">
          There was a problem loading the map.
        </SectionMessage>
      </div>
    );
  }

  if (loading) {
    return (
      <div styleName="root">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div styleName="root">
      <div styleName="control-bar-container">
        <div styleName="control">
          <span styleName="label">Select Area</span>
          <DropdownSelector
            value={selectedGeography}
            onChange={changeGeography}
          >
            <optgroup label="Select Areas">
              <option value="dfps_region">DFPS Regions</option>
              <option value="county">Counties</option>
              <option value="cbsa">Core base statistical areas</option>
              <option value="urban_area">Urban Areas</option>
              <option value="zcta">Zip Codes</option>
              <option value="census_tract">Census Tracts</option>
            </optgroup>
          </DropdownSelector>
        </div>
        <div styleName="control">
          <span styleName="label">Select Display</span>
          <DropdownSelector value="allCIs">
            <optgroup label="Select Display">
              {OBSERVED_FEATURES.map(feature => (
                <option key={feature.field}>{feature.name}</option>
              ))}
            </optgroup>
          </DropdownSelector>
        </div>
        <div styleName="control">
          <span styleName="label">Select TimeFrame</span>
          <DropdownSelector value={selectedYear} onChange={changeYear} disabled>
            <optgroup label="Select Timeframe" />
            <option value="2019">2019</option>
          </DropdownSelector>
        </div>
      </div>
      <div
        styleName="map"
        className="map-container"
        ref={el => (mapContainer = el)}
      />
    </div>
  );
}

export default MainMap;
