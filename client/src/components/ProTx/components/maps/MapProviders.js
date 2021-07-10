import L from 'leaflet';

export default function Maptiles() {
  const providers = [];
  const layers = {};

  // Provider: Stamen.
  // No key required.
  const basemapToner = L.tileLayer(
    'https://stamen-tiles-{s}.a.ssl.fastly.net/toner/{z}/{x}/{y}{r}.{ext}',
    {
      attribution:
        'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      subdomains: 'abcd',
      minZoom: 0,
      maxZoom: 20,
      ext: 'png',
      name: 'Stamen - Toner'
    }
  );

  const basemapTonerLite = L.tileLayer(
    'https://stamen-tiles-{s}.a.ssl.fastly.net/toner-lite/{z}/{x}/{y}{r}.{ext}',
    {
      attribution:
        'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      subdomains: 'abcd',
      minZoom: 0,
      maxZoom: 20,
      ext: 'png',
      name: 'Stamen - Toner Light'
    }
  );

  const basemapTerrain = L.tileLayer(
    'https://stamen-tiles-{s}.a.ssl.fastly.net/terrain/{z}/{x}/{y}{r}.{ext}',
    {
      attribution:
        'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      subdomains: 'abcd',
      minZoom: 0,
      maxZoom: 18,
      ext: 'png',
      name: 'Stamen - Terrain'
    }
  );

  // Provider: Open Street Maps
  // No key required.
  const basemapOsmDefault = L.tileLayer(
    'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    {
      attribution:
        'Map data: &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      minZoom: 0,
      maxZoom: 17,
      name: 'OSM - Default',
      type: 'png'
    }
  );

  const basemapOsmTopo = L.tileLayer(
    'https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png',
    {
      attribution:
        'Map data: &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)',
      minZoom: 0,
      maxZoom: 17,
      name: 'OSM - OpenTopo',
      type: 'png'
    }
  );

  const basemapOsmMapnik = L.tileLayer(
    'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      minZoom: 0,
      maxZoom: 19,
      name: 'OSM - Mapnik',
      type: 'png'
    }
  );

  const basemapOsmBw = L.tileLayer(
    'https://{s}.tiles.wmflabs.org/bw-mapnik/{z}/{x}/{y}.png',
    {
      attribution:
        '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      minZoom: 0,
      maxZoom: 18,
      name: 'OSM - Mapnik B&W',
      type: 'png'
    }
  );

  providers.push(basemapOsmDefault);
  providers.push(basemapOsmTopo);
  providers.push(basemapOsmMapnik);
  providers.push(basemapOsmBw);
  providers.push(basemapToner);
  providers.push(basemapTonerLite);
  providers.push(basemapTerrain);

  Object.keys(providers).forEach(k => {
    const layer = providers[k];
    const layerName = providers[k].options.name;
    layers[layerName] = layer;
  });

  return {
    providers,
    layers
  };
}
