export const SUPPORTED_YEARS = [
  '2019',
  '2018',
  '2017',
  '2016',
  '2015',
  '2014',
  '2013',
  '2012',
  '2011',
  '2010'
];

export const OBSERVED_FEATURES = [
  { field: 'E_AGE17', name: 'Estimated population age 17 or younger' },
  { field: 'E_AGE65', name: 'Estimated population age 65 or older' },
  { field: 'E_CROWD', name: 'Estimated crowding' },
  {
    field: 'EP_CROWD',
    name: 'Estimated percent crowding',
    valueType: 'percent',
    valueTypeLabel: 'Percent'
  },
  { field: 'E_DISABL', name: 'Estimated disabled population' },
  {
    field: 'EP_DISABL',
    name: 'Estimated percent disabled population',
    valueType: 'percent',
    valueTypeLabel: 'Percent'
  },
  { field: 'E_GROUPQ', name: 'Estimated population living in group quarters' },
  { field: 'E_HH', name: 'Estimated households' },
  { field: 'E_HU', name: 'Estimated housing units' },
  {
    field: 'E_LIMENG',
    name: 'Estimated population with limited English skills'
  },
  {
    field: 'EP_LIMENG',
    name: 'Estimated percent population with limited English skills',
    valueType: 'percent',
    valueTypeLabel: 'Percent'
  },
  { field: 'E_MOBILE', name: 'Estimated mobile homes' },
  {
    field: 'EP_MOBILE',
    name: 'Estimated percent mobile homes',
    valueType: 'percent',
    valueTypeLabel: 'Percent'
  },
  { field: 'E_MUNIT', name: 'Estimated number of multi-unit structures' },
  {
    field: 'E_NOHSDP',
    name: 'Estimated population with no high school diploma'
  },
  {
    field: 'EP_NOHSDP',
    name: 'Estimated percent population with no high school diploma',
    valueType: 'percent',
    valueTypeLabel: 'Percent'
  },
  { field: 'E_NOVEH', name: 'Estimated households with no vehicle' },
  {
    field: 'EP_NOVEH',
    name: 'Estimated percent households with no vehicle',
    valueType: 'percent',
    valueTypeLabel: 'Percent'
  },
  { field: 'E_PCI', name: 'Estimated per capita income' },
  { field: 'E_POV', name: 'Estimated population below poverty threshold' },
  {
    field: 'EP_POV',
    name: 'Estimated percent population below poverty threshold',
    valueType: 'percent',
    valueTypeLabel: 'Percent'
  },
  { field: 'E_SNGPNT', name: 'Estimated single parent households' },
  { field: 'E_TOTPOP', name: 'Estimated total population' },
  { field: 'E_UNEMP', name: 'Estimated unemployed population' },
  {
    field: 'EP_UNEMP',
    name: 'Estimated percent unemployed population',
    valueType: 'percent',
    valueTypeLabel: 'Percent'
  },
  { field: 'E_UNINSUR', name: 'Estimated uninsured population' },
  {
    field: 'EP_UNINSUR',
    name: 'Estimated percent uninsured population',
    valueType: 'percent',
    valueTypeLabel: 'Percent'
  },
  { field: 'E_MINRTY', name: 'Estimated minority population' },
  {
    field: `E_FOREIGN_BORN`,
    name: `Estimated foreign born population`
  },
  {
    field: `E_FOREIGN_BORN_P`,
    name: `Estimated percent foreign born population`,
    valueType: 'percent',
    valueTypeLabel: 'Percent'
  },
  {
    field: `E_RENTER_OCCUPIED_HOUSING_UNITS`,
    name: `Estimated renter-occupied housing units`
  },
  {
    field: `E_RENTER_OCCUPIED_HOUSING_UNITS_P`,
    name: `Estimated percent renter-occupied housing units`,
    valueType: 'percent',
    valueTypeLabel: 'Percent'
  },
  {
    field: `E_MEDIAN_GROSS_RENT_P`,
    name: `Estimated median gross rent as a percentage of household income`,
    valueType: 'percent',
    valueTypeLabel: 'Percent'
  }
];

export const OBSERVED_FEATURES_TOP_FIELDS = [
  'E_SNGPNT',
  'E_POV',
  /* 'EP_POV', */
  'E_PCI',
  'E_AGE17',
  'E_NOHSDP',
  /* 'EP_NOHSDP', */
  'E_GROUPQ',
  'E_CROWD'
  /* 'EP_CROWD' */
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
  },
  {
    field: 'NA',
    name: 'Missing (NA)',
    valueType: 'count',
    valueTypeLabel: 'Count'
  }
];

/* should be added to nested folder in MALTREATMENT list
export const MALTREATMENT_PERCENT = [
  { field: 'ABAN_PCT', name: 'Abandonment (%)' },
  { field: 'EMAB_PCT', name: 'Emotional abuse  (%)' },
  { field: 'LBTR_PCT', name: 'Labor trafficking  (%)' },
  { field: 'MDNG_PCT', name: 'Medical neglect  (%)' },
  { field: 'NSUP_PCT', name: 'Neglectful supervision  (%)' },
  { field: 'PHAB_PCT', name: 'Physical abuse  (%)' },
  { field: 'PHNG_PCT', name: 'Physical neglect  (%)' },
  { field: 'RAPR_PCT', name: 'Refusal to accept parental responsibility  (%)' },
  { field: 'SXAB_PCT', name: 'Sexual abuse  (%)' },
  { field: 'SXTR_PCT', name: 'Sex trafficking  (%)' },
];
*/

// TOOO: we should correct vector files to all be the same thing (GEOID)
export const GEOID_KEY = {
  cbsa: 'GEOID_left',
  census_tract: 'GEOID',
  county: 'GEO_ID',
  dfps_region: 'Sheet1__Re',
  urban_area: 'GEOID10',
  zcta: 'GEOID10'
};
