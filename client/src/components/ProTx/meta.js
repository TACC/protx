export const OBSERVED_FEATURES = [
  { field: 'E_AGE17', name: 'Estimated population age 17 or younger' },
  { field: 'E_AGE65', name: 'Estimated population age 65 or older' },
  { field: 'E_CROWD', name: 'Estimated percent crowding' },
  { field: 'E_DISABL', name: 'Estimated disabled population' },
  { field: 'E_GROUPQ', name: 'Estimated population living in group quarters' },
  { field: 'E_HH', name: 'Estimated households' },
  { field: 'E_HU', name: 'Estimated housing units' },
  {
    field: 'E_LIMENG',
    name: 'Estimated population with limited English skills'
  },
  { field: 'E_MOBILE', name: 'Estimated mobile homes' },
  { field: 'E_MUNIT', name: 'Estimated number of multi-unit structures' },
  {
    field: 'E_NOHSDP',
    name: 'Estimated population with no high school diploma'
  },
  { field: 'E_NOVEH', name: 'Estimated households with no vehicle' },
  { field: 'E_PCI', name: 'Estimated per capita income' },
  { field: 'E_POV', name: 'Estimated population below poverty threshold' },
  { field: 'E_SNGPNT', name: 'Estimated single parent households' },
  { field: 'E_TOTPOP', name: 'Estimated total population' },
  { field: 'E_UNEMP', name: 'Estimated unemployed population' },
  { field: 'E_UNINSUR', name: 'Estimated uninsured population' },
  { field: 'E_MINRTY', name: 'Estimated minority population' }
];

export const MALTREATMENT = [
  { field: 'ALL', name: 'All' },
  { field: 'ABAN', name: 'Abandonment' },
  { field: 'EMAB', name: 'Emotional abuse' },
  { field: 'LBTR', name: 'Labor trafficking' },
  { field: 'MDNG', name: 'Medical neglect' },
  { field: 'NSUP', name: 'Neglectful supervision' },
  { field: 'PHAB', name: 'Physical abuse' },
  { field: 'PHNG', name: 'Physical neglect' },
  { field: 'RAPR', name: 'Refusal to accept parental responsibility' },
  { field: 'SXAB', name: 'Sexual abuse' },
  { field: 'SXTR', name: 'Sex trafficking' },
  { field: 'NA', name: 'Missing (NA)' } // TODO confirm this can be changed to Missing (N
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
