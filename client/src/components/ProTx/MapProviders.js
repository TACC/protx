import L from 'leaflet';

export default function Maptiles() {
  const providers = [];
  const layers = {};

  // Provider: Stamen.
  // No key required.
  const tonerUrl = 'http://{S}tile.stamen.com/toner/{Z}/{X}/{Y}.png';
  const tonerUrl_clean = tonerUrl.replace(/({[A-Z]})/g, s => s.toLowerCase());
  const basemap_toner = L.tileLayer(tonerUrl_clean, {
    attribution:
      'Map tiles by <a href="http://stamen.com">Stamen Design</a>, under <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a>. Data by <a href="http://openstreetmap.org">OpenStreetMap</a>, under <a href="http://www.openstreetmap.org/copyright">ODbL</a>.',
    minZoom: 0,
    maxZoom: 20,
    name: 'Stamen Toner',
    subdomains: ['', 'a.', 'b.', 'c.', 'd.'],
    type: 'png'
  });

  const tonerLiteUrl = 'http://{S}tile.stamen.com/toner-lite/{Z}/{X}/{Y}.png';
  const tonerLiteUrl_clean = tonerLiteUrl.replace(/({[A-Z]})/g, s =>
    s.toLowerCase()
  );
  const basemap_tonerLite = L.tileLayer(tonerLiteUrl_clean, {
    attribution:
      'Map tiles by <a href="http://stamen.com">Stamen Design</a>, under <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a>. Data by <a href="http://openstreetmap.org">OpenStreetMap</a>, under <a href="http://www.openstreetmap.org/copyright">ODbL</a>.',
    minZoom: 0,
    maxZoom: 20,
    name: 'Stamen Toner Lite',
    subdomains: ['', 'a.', 'b.', 'c.', 'd.'],
    type: 'png'
  });

  const terrainUrl = 'http://{S}tile.stamen.com/terrain/{Z}/{X}/{Y}.png';
  const terrainUrl_clean = terrainUrl.replace(/({[A-Z]})/g, s =>
    s.toLowerCase()
  );
  const basemap_terrain = L.tileLayer(terrainUrl_clean, {
    attribution:
      'Map tiles by <a href="http://stamen.com">Stamen Design</a>, under <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a>. Data by <a href="http://openstreetmap.org">OpenStreetMap</a>, under <a href="http://www.openstreetmap.org/copyright">ODbL</a>.',
    minZoom: 0,
    maxZoom: 20,
    name: 'Stamen Terrain',
    subdomains: ['', 'a.', 'b.', 'c.', 'd.'],
    type: 'png'
  });

  const watercolorUrl = 'http://{S}tile.stamen.com/watercolor/{Z}/{X}/{Y}.png';
  const watercolorUrl_clean = watercolorUrl.replace(/({[A-Z]})/g, s =>
    s.toLowerCase()
  );
  const basemap_watercolor = L.tileLayer(watercolorUrl_clean, {
    attribution:
      'Map tiles by <a href="http://stamen.com">Stamen Design</a>, under <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a>. Data by <a href="http://openstreetmap.org">OpenStreetMap</a>, under <a href="http://creativecommons.org/licenses/by-sa/3.0">CC BY SA</a>',
    minZoom: 0,
    maxZoom: 20,
    name: 'Stamen Watercolor',
    subdomains: ['', 'a.', 'b.', 'c.', 'd.'],
    type: 'png'
  });

  // Provider: Open Street Maps
  // No key required.

  const osm_defaultUrl = 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
  const osm_defaultUrl_clean = osm_defaultUrl.replace(/({[A-Z]})/g, s =>
    s.toLowerCase()
  );
  const basemap_osm_default = L.tileLayer(osm_defaultUrl_clean, {
    attribution:
      'Map data: &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    minZoom: 0,
    maxZoom: 17,
    name: 'OSM - Default',
    type: 'png'
  });

  const osm_topoUrl = 'http://{s}.tile.opentopomap.org/{z}/{x}/{y}.png';
  const osm_topoUrl_clean = osm_topoUrl.replace(/({[A-Z]})/g, s =>
    s.toLowerCase()
  );
  const basemap_osm_topo = L.tileLayer(osm_topoUrl_clean, {
    attribution:
      'Map data: &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)',
    minZoom: 0,
    maxZoom: 17,
    name: 'OSM - OpenTopo',
    type: 'png'
  });

  const osm_mapnikUrl = 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
  const osm_mapnikUrl_clean = osm_mapnikUrl.replace(/({[A-Z]})/g, s =>
    s.toLowerCase()
  );
  const basemap_osm_mapnik = L.tileLayer(osm_mapnikUrl_clean, {
    attribution:
      '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    minZoom: 0,
    maxZoom: 19,
    name: 'OSM - Mapnik',
    type: 'png'
  });

  const osm_bwUrl = 'http://{s}.tiles.wmflabs.org/bw-mapnik/{z}/{x}/{y}.png';
  const osm_bwUrl_clean = osm_bwUrl.replace(/({[A-Z]})/g, s => s.toLowerCase());
  const basemap_osm_bw = L.tileLayer(osm_bwUrl_clean, {
    attribution:
      '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    minZoom: 0,
    maxZoom: 18,
    name: 'OSM - Mapnik B&W',
    type: 'png'
  });

  // Provider: Thunder Forrest
  const tf_api_key = 'XYZXYZXYZ';

  const tf_transportUrl =
    'http://{s}.tile.thunderforest.com/transport/{z}/{x}/{y}.png?apikey={apikey}';
  const tf_transportUrl_clean = tf_transportUrl.replace(/({[A-Z]})/g, s =>
    s.toLowerCase()
  );
  const basemap_tf_transport = L.tileLayer(tf_transportUrl_clean, {
    apikey: tf_api_key,
    attribution:
      '&copy; <a href="http://www.thunderforest.com/">Thunderforest</a>, &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    minZoom: 0,
    maxZoom: 19,
    name: 'TF - Transport',
    type: 'png'
  });

  const tf_transportDarkUrl =
    'http://{s}.tile.thunderforest.com/transport-dark/{z}/{x}/{y}.png?apikey={apikey}';
  const tf_transportDarkUrl_clean = tf_transportDarkUrl.replace(
    /({[A-Z]})/g,
    s => s.toLowerCase()
  );
  const basemap_tf_transport_dark = L.tileLayer(tf_transportUrl_clean, {
    apikey: tf_api_key,
    attribution:
      '&copy; <a href="http://www.thunderforest.com/">Thunderforest</a>, &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    minZoom: 0,
    maxZoom: 19,
    name: 'TF - Transport Dark',
    type: 'png'
  });

  providers.push(basemap_osm_default);
  providers.push(basemap_osm_topo);
  providers.push(basemap_osm_mapnik);
  providers.push(basemap_osm_bw);
  //providers.push(basemap_toner);
  //providers.push(basemap_tonerLite);
  //providers.push(basemap_terrain);
  //providers.push(basemap_watercolor);

  for (const k in providers) {
    if (providers.hasOwnProperty(k)) {
      // console.log(k, providers[k]);
      const layer = providers[k];
      const layerName = providers[k].options.name;
      layers[layerName] = layer;
    }
  }

  return {
    providers,
    layers
  };
}
