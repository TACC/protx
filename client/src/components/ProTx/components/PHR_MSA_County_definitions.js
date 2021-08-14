export const PHR_MSA_COUNTY_DEFINITIONS = [
  {
    '0': {
      Term: 'County Name',
      Definition:
        'Note - Many Texas county names have a variety of spellings. For this reason, you should avoid using the county name to match or join two tables of county data, particularly if they are from different sources. We recommend using the county number of FIPS code as the basis for the match or join. Do not assume that two tables with Texas county data that look like they are both in alphabetical order are actually arranged in exactly the same order.'
    },
    '1': {
      Term: 'FIPS',
      Definition:
        "Federal Information Processing Standard; a unique code that identifies counties and county equivalents in the United States. In this dataset there are only 3 digits, but a complete FIPS county code would contain 5 digits, with the 3 digit codes in the dataset preceeded by '48', the state code for Texas. For example, Anderson county is 001 in this dataset, but would be 48001 if the set included counties from other states."
    },
    '2': {
      Term: 'County Number',
      Definition:
        'This code is a unique identifier that the Center for Health Statistics uses for counties in Texas. The County Code = (FIPS+1)/2'
    },
    '3': {
      Term: 'Public Health Region',
      Definition: 'Each county is assigned to one of 11 public health regions.'
    },
    '4': {
      Term: 'Health Service Area',
      Definition:
        'For administrative purposes, there are 8 regional public health offices, some of which service multiple or partial public health regions. The 8 geographies served by the offices are called health service regions.'
    },
    '5': {
      Term: 'Metropolitan Statistical Area',
      Definition:
        "A Metropolitan Statistical Area (MSA) has a large population nucleus and adjacent communities that have a high degree of social and economic integration with the core. MSAs are defined by the U.S. Office of Management and Budget (OMB). The most recent update was in 2013. '--' Indicates that the county is not in an MSA."
    },
    '6': {
      Term: 'Metropolitan Divisions',
      Definition:
        "Some MSAs in the U.S. are deemed large enough to be subdivided into metropolitan divisions. In Texas, there are two metropolitan divisions subdividing the Dallas-Fort Worth-Arlington MSA, the Dallas-Plano-Irving MD and the Fort Worth-Arlington MD. '--' Indicates that the county is not in an MD."
    },
    '7': {
      Term: 'Metro Area',
      Definition:
        'Any county that is part of an MSA is classified as a metro area regardless of its own size. A number of low population counties in Texas are considered metro areas because they are adjacent to larger population cores and share social and economic integration with the core.'
    },
    '8': {
      Term: 'NCHS Urban-Rural Classification',
      Definition:
        'An urban-rural designation developed by the National Center for Health Statistics. The most recent classification scheme was developed in 2013.'
    },
    '9': {
      Term: 'Border Region (32)',
      Definition:
        'This region contains the 32 counties considered to be border counties according to the La Paz Agreement.'
    },
    '10': {
      Term: 'Border Region (15)',
      Definition:
        'This region encompasses the 15 counties that share a physical border with Mexico.'
    }
  }
];
