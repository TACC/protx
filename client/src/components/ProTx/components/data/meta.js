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
  { field: 'E_AGE17', name: 'Population age 17 or younger' },
  { field: 'E_AGE65', name: 'Population age 65 or older' },
  { field: 'E_CROWD', name: 'Crowding' },
  {
    field: 'EP_CROWD',
    name: 'Crowding',
    valueType: 'percent',
    valueTypeLabel: 'Percent'
  },
  { field: 'E_DISABL', name: 'Disabled population' },
  {
    field: 'EP_DISABL',
    name: 'Disabled population',
    valueType: 'percent',
    valueTypeLabel: 'Percent'
  },
  { field: 'E_GROUPQ', name: 'Population living in group quarters' },
  { field: 'E_HH', name: 'Households' },
  { field: 'E_HU', name: 'Housing units' },
  {
    field: 'E_LIMENG',
    name: 'Population with limited English skills'
  },
  {
    field: 'EP_LIMENG',
    name: 'Population with limited English skills',
    valueType: 'percent',
    valueTypeLabel: 'Percent'
  },
  { field: 'E_MOBILE', name: 'Mobile homes' },
  {
    field: 'EP_MOBILE',
    name: 'Mobile homes',
    valueType: 'percent',
    valueTypeLabel: 'Percent'
  },
  { field: 'E_MUNIT', name: 'Number of multi-unit structures' },
  {
    field: 'E_NOHSDP',
    name: 'Population with no high school diploma'
  },
  {
    field: 'EP_NOHSDP',
    name: 'Population with no high school diploma',
    valueType: 'percent',
    valueTypeLabel: 'Percent'
  },
  { field: 'E_NOVEH', name: 'Households with no vehicle' },
  {
    field: 'EP_NOVEH',
    name: 'Households with no vehicle',
    valueType: 'percent',
    valueTypeLabel: 'Percent'
  },
  { field: 'E_PCI', name: 'Per capita income' },
  { field: 'E_POV', name: 'Population below poverty threshold' },
  {
    field: 'EP_POV',
    name: 'Population below poverty threshold',
    valueType: 'percent',
    valueTypeLabel: 'Percent'
  },
  { field: 'E_SNGPNT', name: 'Single parent households' },
  { field: 'E_TOTPOP', name: 'Total population' },
  { field: 'E_UNEMP', name: 'Unemployed population' },
  {
    field: 'EP_UNEMP',
    name: 'Unemployed population',
    valueType: 'percent',
    valueTypeLabel: 'Percent'
  },
  { field: 'E_UNINSUR', name: 'Uninsured population' },
  {
    field: 'EP_UNINSUR',
    name: 'Uninsured population',
    valueType: 'percent',
    valueTypeLabel: 'Percent'
  },
  { field: 'E_MINRTY', name: 'Minority population' },
  {
    field: `E_FOREIGN_BORN`,
    name: `Foreign born population`
  },
  {
    field: `E_FOREIGN_BORN_P`,
    name: `Foreign born population`,
    valueType: 'percent',
    valueTypeLabel: 'Percent'
  },
  {
    field: `E_RENTER_OCCUPIED_HOUSING_UNITS`,
    name: `Renter-occupied housing units`
  },
  {
    field: `E_RENTER_OCCUPIED_HOUSING_UNITS_P`,
    name: `Renter-occupied housing units`,
    valueType: 'percent',
    valueTypeLabel: 'Percent'
  },
  {
    field: `E_MEDIAN_GROSS_RENT_P`,
    name: `Median gross rent as a percentage of household income`,
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
