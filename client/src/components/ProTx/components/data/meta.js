export const SUPPORTED_YEARS = [
  '2019',
  '2018',
  '2017',
  '2016',
  '2015',
  '2014',
  '2013',
  '2012',
  '2011'
];

export const OBSERVED_FEATURES_TOP_FIELDS = [
  'SNGPNT',
  'POV',
  'PCI',
  'AGE17',
  'NOHSDP',
  'GROUPQ',
  'CROWD'
];

export const MALTREATMENT = [
  {
    field: 'ABAN',
    name: 'Abandonment',
    valueType: 'count',
    valueTypeLabel: 'Count'
  },
  {
    field: 'EMAB',
    name: 'Emotional abuse',
    valueType: 'count',
    valueTypeLabel: 'Count'
  },
  {
    field: 'LBTR',
    name: 'Labor trafficking',
    valueType: 'count',
    valueTypeLabel: 'Count'
  },
  {
    field: 'MDNG',
    name: 'Medical neglect',
    valueType: 'count',
    valueTypeLabel: 'Count'
  },
  {
    field: 'NSUP',
    name: 'Neglectful supervision',
    valueType: 'count',
    valueTypeLabel: 'Count'
  },
  {
    field: 'PHAB',
    name: 'Physical abuse',
    valueType: 'count',
    valueTypeLabel: 'Count'
  },
  {
    field: 'PHNG',
    name: 'Physical neglect',
    valueType: 'count',
    valueTypeLabel: 'Count'
  },
  {
    field: 'RAPR',
    name: 'Refusal to accept parental responsibility',
    valueType: 'count',
    valueTypeLabel: 'Count'
  },
  {
    field: 'SXAB',
    name: 'Sexual abuse',
    valueType: 'count',
    valueTypeLabel: 'Count'
  },
  {
    field: 'SXTR',
    name: 'Sex trafficking',
    valueType: 'count',
    valueTypeLabel: 'Count'
  }
];

// TOOO: we should correct vector files to all be the same thing (GEOID)
export const GEOID_KEY = {
  cbsa: 'GEOID_left',
  census_tract: 'GEOID',
  county: 'GEO_ID',
  dfps_region: 'Sheet1__Re',
  urban_area: 'GEOID10',
  zcta: 'GEOID10'
};

/**
 * Define array of category codes.
 */
export const CATEGORY_CODES = [
  'ABAN',
  'EMAB',
  'LBTR',
  'MDNG',
  'NSUP',
  'PHAB',
  'PHNG',
  'RAPR',
  'SXAB',
  'SXTR',
  'NA'
];
