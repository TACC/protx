import React, { useEffect, useState, useRef } from 'react';

import L from 'leaflet';
import 'leaflet.vectorgrid';
import PropTypes from 'prop-types';
import MapProviders from './MapProviders';
import { GEOID_KEY } from '../data/meta';
import './MainMap.css';
import './MainMap.module.scss';
import 'leaflet/dist/leaflet.css';
import { getMetaData } from '../shared/dataUtils';
import { IntervalColorScale, getFeatureStyle } from '../shared/mapUtils';

let mapContainer;

function MainMap({
  mapType,
  geography,
  maltreatmentTypes,
  observedFeature,
  year,
  showRate,
  data,
  selectedGeographicFeature,
  setSelectedGeographicFeature
}) {
  const dataServer = window.location.origin;

  // Leaflet related layers, controls, and map
  const [legendControl, setLegendControl] = useState(null);
  const [layersControl, setLayersControl] = useState(null);
  const [dataLayer, setDataLayer] = useState(null);
  const [texasOutlineLayer, setTexasOutlineLayer] = useState(null);
  const [map, setMap] = useState(null);
  const [metaData, setMetaData] = useState(null);
  const [selectedGeoid, setSelectedGeoid] = useState(null);

  const refSelectedGeoid = useRef(selectedGeoid); // Make a ref of the selected feature

  function updateSelectedGeographicFeature(newSelectedFeature) {
    refSelectedGeoid.current = newSelectedFeature;
    setSelectedGeoid(newSelectedFeature);
    setSelectedGeographicFeature(newSelectedFeature);
  }

  useEffect(() => {
    if (map) {
      return;
    }

    const texasOutlineGeojson = L.geoJSON(data.texasBoundary);
    const texasBounds = texasOutlineGeojson.getBounds(texasOutlineGeojson);

    const newMap = L.map(mapContainer, {
      zoom: 6,
      minZoom: 6,
      maxZoom: 16,
      maxBounds: texasBounds,
      maxBoundsViscosity: 1.0,
      doubleClickZoom: false
    }).fitBounds(texasBounds);

    const texasOutline = L.vectorGrid
      .slicer(data.texasBoundary, {
        rendererFactory: L.canvas.tile,
        vectorTileLayerStyles: {
          sliced(properties, zoom) {
            return {
              stroke: true,
              color: 'black',
              weight: 2
            };
          }
        }
      })
      .addTo(newMap);

    // Create Layers Control.
    const { providers, layers: baseMaps } = MapProviders();
    providers[3].addTo(newMap);
    setLayersControl(L.control.layers(baseMaps).addTo(newMap));
    setMap(newMap);
    setTexasOutlineLayer(texasOutline);
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
        maltreatmentTypes,
        showRate
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
          const scaleRoundingValue = 0;

          // loop through our density intervals and generate a label with a colored square for each interval
          for (let i = 0; i < colorScale.numberIntervals; i += 1) {
            div.innerHTML += `<div class="scale-value"><i style="background:${
              colorScale.colors[i]
            }"></i> <span>${intervalValues[i].toFixed(
              scaleRoundingValue
            )}&ndash;${intervalValues[i + 1].toFixed(
              scaleRoundingValue
            )}</span></div><br>`;
          }

          return div;
        };
        // add new data layer to map and controls
        newLegend.addTo(map);
        setLegendControl(newLegend);
      }
    }
  }, [
    data,
    mapType,
    observedFeature,
    geography,
    maltreatmentTypes,
    year,
    showRate,
    map,
    texasOutlineLayer
  ]);

  useEffect(() => {
    const vectorTile = `${dataServer}/data-static/vector/${geography}/2019/{z}/{x}/{y}.pbf`;
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
              maltreatmentTypes,
              showRate
            );
          }
        },
        interactive: true,
        getFeatureId(f) {
          return f.properties[GEOID_KEY[geography]];
        },
        maxNativeZoom: 14 // All tiles generated up to 14 zoom level
      });

      if (dataLayer && layersControl) {
        // we will remove data layer from mapand from control
        layersControl.removeLayer(dataLayer);
        dataLayer.remove();
      }

      // Add click handler
      newDataLayer.on('click', e => {
        const clickedGeographicFeature =
          e.layer.properties[GEOID_KEY[geography]];

        if (refSelectedGeoid.current) {
          newDataLayer.resetFeatureStyle(refSelectedGeoid.current);
        }

        if (clickedGeographicFeature !== refSelectedGeoid.current) {
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
            color: 'black',
            weight: 2.0,
            stroke: true
          };
          if (mapType === 'maltreatment') {
            // Simple zoom to point clicked and having fixed zoom level for counties
            // See https://jira.tacc.utexas.edu/browse/COOKS-54
            map.setView(e.latlng, 9);
          }
          newDataLayer.setFeatureStyle(
            clickedGeographicFeature,
            highlightedStyle
          );
        } else {
          updateSelectedGeographicFeature('');
        }
      });

      // add new data layer to map and controls
      newDataLayer.addTo(map);
      layersControl.addOverlay(newDataLayer, 'Data');
      setDataLayer(newDataLayer);

      // updated/new layer
      if (selectedGeographicFeature) {
        const highlightedStyle = {
          ...getFeatureStyle(
            mapType,
            data,
            metaData,
            geography,
            year,
            selectedGeographicFeature,
            observedFeature,
            maltreatmentTypes
          ),
          color: 'black',
          weight: 2.0,
          stroke: true
        };
        newDataLayer.setFeatureStyle(
          selectedGeographicFeature,
          highlightedStyle
        );
      }

      // ensure that texas outline is on top
      texasOutlineLayer.bringToFront();
    }
  }, [
    data,
    metaData,
    mapType,
    geography,
    observedFeature,
    maltreatmentTypes,
    year,
    showRate,
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
  showRate: PropTypes.bool.isRequired,
  selectedGeographicFeature: PropTypes.string.isRequired,
  setSelectedGeographicFeature: PropTypes.func.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  data: PropTypes.object.isRequired
};

export default MainMap;
