import React, { useEffect, useState, useRef } from 'react';

import L from 'leaflet';
import 'leaflet.vectorgrid';
import PropTypes from 'prop-types';
import MapProviders from './MapProviders';
import { GEOID_KEY } from '../meta';
import { IntervalColorScale } from './intervalColorScale';
import texasBounds from './texasBoundary';
import './MainMap.css';
import './MainMap.module.scss';
import 'leaflet/dist/leaflet.css';
import { getMetaData, getFeatureStyle } from '../util';

let mapContainer;

function MainMap({
  mapType,
  geography,
  maltreatmentTypes,
  observedFeature,
  year,
  data
}) {
  const dataServer = window.location.origin;

  // Leaflet related layers, controls, and map
  const [legendControl, setLegendControl] = useState(null);
  const [layersControl, setLayersControl] = useState(null);
  const [dataLayer, setDataLayer] = useState(null);
  const [map, setMap] = useState(null);
  const [metaData, setMetaData] = useState(null);
  const [selectedGeographicFeature, setSelectedGeographicFeature] = useState(
    null
  );

  const refSelectedGeographicFeature = useRef(selectedGeographicFeature); // Make a ref of the selected feature

  function updateSelectedGeographicFeature(newSelectedFeature) {
    refSelectedGeographicFeature.current = newSelectedFeature;
    setSelectedGeographicFeature(newSelectedFeature);
  }

  useEffect(() => {
    if (map) {
      return;
    }

    const newMap = L.map(mapContainer, {
      zoom: 6,
      minZoom: 6,
      maxZoom: 16,
      maxBounds: texasBounds,
      maxBoundsViscosity: 1.0
    }).fitBounds(texasBounds);

    // Create Layers Control.
    const { providers, layers: baseMaps } = MapProviders();
    providers[3].addTo(newMap);
    setLayersControl(L.control.layers(baseMaps).addTo(newMap));
    setMap(newMap);
  }, [data, mapContainer]);

  useEffect(() => {
    if (map) {
      // remove old legend
      if (legendControl) {
        legendControl.remove();
      }

      const meta = getMetaData(
        data,
        mapType,
        geography,
        year,
        observedFeature,
        maltreatmentTypes
      );
      // set for use by vector layer
      setMetaData(meta);

      if (meta) {
        const newLegend = L.control({ position: 'bottomright' });

        newLegend.onAdd = () => {
          const div = L.DomUtil.create('div', 'color legend');

          // get numeric values between intervals
          const colorScale = new IntervalColorScale(meta);
          const intervalValues = colorScale.getIntervalValues();

          // loop through our density intervals and generate a label with a colored square for each interval
          for (let i = 0; i < colorScale.numberIntervals; i += 1) {
            div.innerHTML += `<i style="background:${
              colorScale.colors[i]
            }"></i> ${intervalValues[i]}&ndash;${intervalValues[i + 1]}<br>`;
          }

          return div;
        };
        // add new data layer to map and controls
        newLegend.addTo(map);
        setLegendControl(newLegend);
      }
    }
  }, [data, mapType, observedFeature, geography, maltreatmentTypes, year, map]);

  useEffect(() => {
    const vectorTile = `${dataServer}/static/data/vector/${geography}/2019/{z}/{x}/{y}.pbf`;
    if (map && layersControl) {
      const newDataLayer = L.vectorGrid.protobuf(vectorTile, {
        vectorTileLayerStyles: {
          singleLayer: properties => {
            const geoid = properties[GEOID_KEY[geography]];
            return getFeatureStyle(
              mapType,
              data,
              metaData,
              geography,
              year,
              geoid,
              observedFeature,
              maltreatmentTypes
            );
          }
        },
        interactive: true,
        getFeatureId(f) {
          return f.properties[GEOID_KEY[geography]];
        },
        maxNativeZoom: 14 // All tiles generated up to 14 zoom level
      });

      // Handle

      if (dataLayer && layersControl) {
        // we will remove data layer from mapand from control
        layersControl.removeLayer(dataLayer);
        dataLayer.remove();
      }

      newDataLayer.on('click', e => {
        const clickedGeographicFeature =
          e.layer.properties[GEOID_KEY[geography]];

        if (refSelectedGeographicFeature.current) {
          newDataLayer.resetFeatureStyle(refSelectedGeographicFeature.current);
        }

        if (clickedGeographicFeature !== refSelectedGeographicFeature.current) {
          updateSelectedGeographicFeature(clickedGeographicFeature);
          const highlightedStyle = {
            ...getFeatureStyle(
              mapType,
              data,
              metaData,
              geography,
              year,
              clickedGeographicFeature,
              observedFeature,
              maltreatmentTypes
            ),
            color: 'red',
            weight: 2.0,
            stroke: true
          };
          newDataLayer.setFeatureStyle(
            clickedGeographicFeature,
            highlightedStyle
          );
        } else {
          updateSelectedGeographicFeature(null);
        }
      });

      // add new data layer to map and controls
      newDataLayer.addTo(map);
      layersControl.addOverlay(newDataLayer, 'Data');
      setDataLayer(newDataLayer);
    }
  }, [
    data,
    metaData,
    mapType,
    geography,
    observedFeature,
    maltreatmentTypes,
    year,
    layersControl,
    map
  ]);

  return <div styleName="map" ref={el => (mapContainer = el)} />;
}

MainMap.propTypes = {
  mapType: PropTypes.string.isRequired,
  geography: PropTypes.string.isRequired,
  maltreatmentTypes: PropTypes.arrayOf(PropTypes.string).isRequired,
  observedFeature: PropTypes.string.isRequired,
  year: PropTypes.string.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  data: PropTypes.object.isRequired
};

export default MainMap;
