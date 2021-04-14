import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import L from 'leaflet';
import 'leaflet.vectorgrid';
import { SectionMessage, LoadingSpinner, DropdownSelector } from '_common';
import MapProviders from './MapProviders';
import './MainMap.css';
import { OBSERVED_FEATURES, GEOID_KEY, MALTREATMENT } from './meta';
import './MainMap.module.scss';
import 'leaflet/dist/leaflet.css';

const coldToHotColors8 = [
  `#ffffcc`,
  `#ffeda0`,
  `#fed976`,
  `#feb24c`,
  `#fd8d3c`,
  `#fc4e2a`,
  `#e31a1c`,
  `#bd0026`,
  `#800026`,
];

// eslint-disable-next-line no-unused-vars
const coldToHotColors6 = [
  `#ffffb2`,
  `#fed976`,
  `#feb24c`,
  `#fd8d3c`,
  `#f03b20`,
  `#bd0026`
];

function getColor(value, min, max) {
  const binValue = Math.min(Math.floor(6 * ((value - min) / (max - min))), 5);
  return coldToHotColors6[binValue];
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
  const dataServer = window.location.origin;
  const dispatch = useDispatch();
  const { loading, error, data } = useSelector(state => state.protx);
  const [mapType, setMapType] = useState('maltreatment');
  const [selectedGeography, setSelectedGeography] = useState('county');
  const [selectedMaltreatmentType, setSelectedMaltreatmentType] = useState(
    MALTREATMENT[0].field
  );
  const [selectedObservedFeature, setSelectedObservedFeature] = useState(
    OBSERVED_FEATURES[0].field
  );
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

    const newMap = L.map(mapContainer, {
      zoom: 6,
      minZoom: 6,
      maxZoom: 16
    }).setView([31.0686, -99.9018]);

    // Create Layers Control.
    const { providers, layers: baseMaps } = MapProviders();
    providers[3].addTo(newMap);
    setLayersControl(L.control.layers(baseMaps).addTo(newMap));
    setMap(newMap);
  }, [loading, data, mapContainer]);

  useEffect(() => {
    const vectorTile = `${dataServer}/static/data/vector/${selectedGeography}/2019/{z}/{x}/{y}.pbf`;
    if (map && layersControl) {
      const newDataLayer = L.vectorGrid.protobuf(vectorTile, {
        vectorTileLayerStyles: {
          singleLayer: properties => {
            let fillColor;
            let hasElementAndProperty;
            const geoid = properties[GEOID_KEY[selectedGeography]];
            // TODO refactor into two style functions
            if (mapType === 'observedFeatures') {
              const dataSet = data.observedFeatures[selectedGeography];
              // TODO confirm that we don't have values for all elements
              const hasElement = geoid in dataSet;
              hasElementAndProperty =
                hasElement && selectedObservedFeature in dataSet[geoid];
              const featureValue = hasElementAndProperty
                ? dataSet[geoid][selectedObservedFeature]
                : 0;
              if (hasElementAndProperty) {
                const meta =
                  data.observedFeaturesMeta[selectedGeography][
                    selectedObservedFeature
                  ];
                fillColor = getColor(featureValue, meta.min, meta.max);
              }
            } else {
              // TODO REWORK (place into different function and remove workarounds for MALTREATMENT_COUNT)
              // TODO only county data provided for 2019
              const mal = data.maltreatment;
              hasElementAndProperty =
                selectedGeography in mal &&
                selectedYear in mal[selectedGeography] &&
                selectedMaltreatmentType in
                  mal[selectedGeography][selectedYear] &&
                geoid in
                  mal[selectedGeography][selectedYear][
                    selectedMaltreatmentType
                  ];
              const featureValue = hasElementAndProperty
                ? mal[selectedGeography][selectedYear][
                    selectedMaltreatmentType
                  ][geoid].MALTREATMENT_COUNT
                : 0;
              if (hasElementAndProperty) {
                const meta =
                  data.maltreatmentMeta[selectedGeography][selectedYear][
                    selectedMaltreatmentType
                  ].MALTREATMENT_COUNT;
                fillColor = getColor(featureValue, meta.min, meta.max);
              }
            }
            return {
              fillColor,
              fill: hasElementAndProperty,
              stroke: false,
              opacity: 1,
              fillOpacity: 0.5
            };
          }
        },
        interactive: true,
        getFeatureId(f) {
          return f.properties[GEOID_KEY[selectedGeography]];
        },
        maxNativeZoom: 14 // All tiles generated up to 14 zoom level
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
  }, [
    data,
    mapType,
    selectedGeography,
    selectedObservedFeature,
    selectedMaltreatmentType,
    selectedYear,
    layersControl,
    map
  ]);

  const changeMapType = event => {
    const newMapType = event.target.value;
    if(newMapType === 'maltreatment') {
      // maltreatment only has county data
      setSelectedGeography('county');
    } else {
      // observedFeatures (i.e. Demographic Features only has 2019 data)
      setSelectedYear(2019);
    }
    setMapType(event.target.value);
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
          <span styleName="label">Map</span>
          <DropdownSelector
            value={mapType}
            onChange={changeMapType}
          >
            <optgroup label="Select Map">
              <option value="observedFeatures">Demographic Features</option>
              <option value="maltreatment">Maltreatment</option>
            </optgroup>
          </DropdownSelector>
        </div>
        <div styleName="control">
          <span styleName="label">Area</span>
          <DropdownSelector
            value={selectedGeography}
            onChange={event => setSelectedGeography(event.target.value)}
            disabled={mapType === 'maltreatment'}
          >
            <optgroup label="Select Areas">
              <option value="dfps_region">DFPS Regions</option>
              <option value="census_tract">Census Tracts</option>
              <option value="county">Counties</option>
              <option value="cbsa">Core base statistical areas</option>
              <option value="urban_area">Urban Areas</option>
              <option value="zcta">Zip Codes</option>
            </optgroup>
          </DropdownSelector>
        </div>
        {mapType === 'maltreatment' && (
          <div styleName="control">
            <span styleName="label">Type</span>
            <DropdownSelector
              value={selectedMaltreatmentType}
              onChange={event =>
                setSelectedMaltreatmentType(event.target.value)
              }
            >
              <optgroup label="Select Maltreatment Type">
                {MALTREATMENT.map(feature => (
                  <option key={feature.field} value={feature.field}>
                    {feature.name}
                  </option>
                ))}
              </optgroup>
            </DropdownSelector>
          </div>
        )}
        {mapType === 'observedFeatures' && (
          <div styleName="control">
            <span styleName="label">Feature</span>
            <DropdownSelector
              value={selectedObservedFeature}
              onChange={event => setSelectedObservedFeature(event.target.value)}
            >
              <optgroup label="Select Observed Feature">
                {OBSERVED_FEATURES.map(feature => (
                  <option key={feature.field} value={feature.field}>
                    {feature.name}
                  </option>
                ))}
              </optgroup>
            </DropdownSelector>
          </div>
        )}
        <div styleName="control">
          <span styleName="label">Select TimeFrame</span>
          <DropdownSelector
            value={selectedYear}
            onChange={event => setSelectedYear(event.target.value)}
            disabled={mapType === 'observedFeatures'}
          >
            <optgroup label="Select Timeframe" />
            <option value="2019">2019</option>
            <option value="2018">2018</option>
            <option value="2017">2017</option>
            <option value="2016">2016</option>
            <option value="2015">2015</option>
            <option value="2014">2014</option>
            <option value="2013">2013</option>
            <option value="2012">2012</option>
            <option value="2011">2011</option>
            <option value="2010">2010</option>
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
