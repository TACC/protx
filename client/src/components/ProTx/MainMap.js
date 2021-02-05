import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import L from 'leaflet';
import 'leaflet.vectorgrid';
import { Message, LoadingSpinner, DropdownSelector } from '_common';
import MapProviders from './MapProviders';
import './MainMap.css';
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

function MainMap() {
  let mapContainer;
  const dispatch = useDispatch();
  const { loading, error, data } = useSelector(state => state.protx);
  const [selectedYear, setSelectedYear] = useState('2015');

  // Get systems and any other initial data we need from the backend
  useEffect(() => {
    dispatch({ type: 'FETCH_PROTX' });
  }, []);

  useEffect(() => {
    if (loading === true) {
      return;
    }
    const initialState = {
      lat: 31.0686,
      lng: -99.9018,
      zoom: 6,
      minZoom: 5,
      maxZoom: 17
    };

    const map = L.map(mapContainer).setView(
      [initialState.lat, initialState.lng],
      initialState.zoom
    );

    let highlight;
    const clearHighlight = function() {
      if (highlight) {
        dataLayer.resetFeatureStyle(highlight);
      }
      highlight = null;
    };

    const dataLayer = L.vectorGrid
      .slicer(data, {
        rendererFactory: L.svg.tile,
        vectorTileLayerStyles: {
          sliced(properties, zoom) {
            const color = getColor(properties[selectedYear]);
            return {
              fillColor: color,
              fillOpacity: 0.7,
              stroke: true,
              fill: true,
              color: 'black',
              weight: 1
            };
          }
        },
        interactive: true,
        getFeatureId(f) {
          return f.properties.GEOID10;
        }
      })
      .on('mouseover', function(e) {
        const { properties } = e.layer;
        L.popup()
          .setContent(getContent(properties, selectedYear))
          .setLatLng(e.latlng)
          .openOn(map);

        clearHighlight();
        highlight = properties.GEOID10;

        const selectedStyle = {
          fillColor: getColor(properties[selectedYear]),
          fillOpacity: 1,
          stroke: true,
          fill: true,
          color: 'red',
          opacity: 1,
          weight: 2
        };

        dataLayer.setFeatureStyle(properties.GEOID10, selectedStyle);
      });

    // Create Layers Control.
    const { providers, layers: baseMaps } = MapProviders();
    providers[3].addTo(map);
    const overlayMaps = { '2015': dataLayer };
    dataLayer.addTo(map);
    L.control.layers(baseMaps, overlayMaps).addTo(map);
  }, [loading, data, mapContainer]);

  if (error) {
    return (
      <div styleName="root">
        <Message type="error">There was a problem loading the map.</Message>
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
          <DropdownSelector value="censusTracts" disabled>
            <optgroup label="Select Areas">
              <option value="dfpsRegions">DFPS Regions</option>
              <option value="counties">Counties</option>
              <option value="metropolitanAreas">Metropolitan Areas</option>
              <option value="cities">Cities</option>
              <option value="zipCodes">Zip Codes</option>
              <option value="schoolDistricts">School Districts</option>
              <option value="censusTracts">Census Tracts</option>
            </optgroup>
          </DropdownSelector>
        </div>
        <div styleName="control">
          <span styleName="label">Select Display</span>
          <DropdownSelector value="allCIs" disabled>
            <optgroup label="Select Display">
              <option value="allCIs">All CIs</option>
              <option value="selectCIs">Select CIs</option>
              <option value="trendOverTime">Trend Over Time</option>
              <option value="thresholds">Thresholds</option>
              <option value="nbhdSocialTapestry">Nbhd SocialTapestry</option>
              <option value="socialCorrelates">Social Correlates</option>
              <option value="predictions">Predictions</option>
              <option value="resources">Sesources</option>
            </optgroup>
          </DropdownSelector>
        </div>
        <div styleName="control">
          <span styleName="label">Select TimeFrame</span>
          <DropdownSelector value={selectedYear} onChange={setSelectedYear}>
            <optgroup label="Select Timeframe" />
            <option value="2008">2008</option>
            <option value="2009">2009</option>
            <option value="2010">2010</option>
            <option value="2011">2011</option>
            <option value="2012">2012</option>
            <option value="2013">2013</option>
            <option value="2014">2014</option>
            <option value="2015">2015</option>
            <option value="2016">2016</option>
            <option value="2017">2017</option>
            <option value="2018">2018</option>
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
