import pandas as pd
import numpy as np
import sqlite3

db_name = '/protx-data/cooks.db'
db_conn = sqlite3.connect(db_name)
db_cursor = db_conn.cursor()


# Aesthetics for plots
def currency(value1, value2):
    return '{:.0f}-{:.0f}'.format(round(value1 / 1000, 0), round(value2 / 1000, 0))


def not_currency(value1, value2):
    return '{:.0f}-{:.0f}'.format(value1, value2)


def hist_to_bar(vector, range_vals, label_template, _n_bins=10):
    """
    vector: range of values
    range_vals: tuple of (min, max) or None
    label_template: function for formatting bin label
    n_bins: number of bins to pass to np.histogram()
    """

    try:
        assert len(vector) > 1
    except AssertionError:
        print('Data vector is empty.')
        return

    height, label = np.histogram(vector, range=range_vals)
    bar_centers = [(label[i - 1] + label[i]) / 2.0 for i in range(1, len(label))]
    label_fmt = [label_template(label[i - 1], label[i]) for i in range(1, len(label))]

    return height, bar_centers, label_fmt


subplot_mapping_aes = {
    'people': {
        'AGE17': {'col': 1, 'range': (0, 100), 'label_fmt': not_currency, 'color': '#636EFA'},
        'GROUPQ': {'col': 2, 'range': (0, 100), 'label_fmt': not_currency, 'color': '#EF553B'},
        'NOHSDP': {'col': 3, 'range': (0, 100), 'label_fmt': not_currency, 'color': '#00CC96'},
        'POV': {'col': 4, 'range': (0, 100), 'label_fmt': not_currency, 'color': '#AB63FA'}
    },
    'hh': {
        'SNGPNT': {'col': 6, 'range': (0, 100), 'label_fmt': not_currency, 'color': '#FFA15A'}
    },
    'hu': {
        'CROWD': {'col': 8, 'range': (0, 100), 'label_fmt': not_currency, 'color': '#19D3F3'}
    },
    'dollars': {
        'PCI': {'col': 10, 'range': None, 'label_fmt': currency, 'color': '#FF6692'}
    }
}

# ## Demographics demo: response to user selection, time series
#
# 1. User selects the "Demographics" tab.
#
# 2. User selects the following from drop down menus:
#
#     - Area (currently fixed to counties)
#     - Demographic
#     - Years (currently fixed to 2019)
#     - (pending: rate vs percent)
#
#
# 3. User selects an area from the map (must happen after drop-down selection for "area" is made)

# ### Select variable across all years

yearly_data_query = '''
select d.VALUE, d.GEOID, d.GEOTYPE, d.DEMOGRAPHICS_NAME, d.YEAR,
    d.UNITS as count_or_pct, g.DISPLAY_TEXT as geo_display, u.UNITS as units, u.DISPLAY_TEXT as units_display
from {report_type} d
left join display_geotype g on
    g.GEOID = d.GEOID and
    g.GEOTYPE = d.GEOTYPE and
    g.YEAR = d.YEAR
join display_data u on
    d.DEMOGRAPHICS_NAME = u.NAME
where d.GEOTYPE = "{area}" and
    d.UNITS = "{unit}" and
    d.DEMOGRAPHICS_NAME = "{variable}";
'''

# ### Select annual values for a focal area

focal_query = '''
select d.VALUE, d.GEOID, d.GEOTYPE, d.DEMOGRAPHICS_NAME, d.YEAR,
    d.UNITS as count_or_pct, g.DISPLAY_TEXT as geo_display, u.UNITS as units, u.DISPLAY_TEXT as units_display
from {report_type} d
left join display_geotype g on
    g.GEOID = d.GEOID and
    g.GEOTYPE = d.GEOTYPE and
    g.YEAR = d.YEAR
join display_data u on
    d.DEMOGRAPHICS_NAME = u.NAME
where d.GEOTYPE = "{area}" and
    d.UNITS = "{unit}" and
    d.DEMOGRAPHICS_NAME = "{variable}" and
    g.DISPLAY_TEXT = "{focal_area}" and
    d.GEOTYPE = "{area}";
'''


def demographic_data_prep(query_return_df):
    """Return a dictionary that specifies a timeseries of histograms"""

    ########################
    # USER INPUT PARSING ## (but below shows parsing from return data)
    ########################

    # parse range based on unit type (todo: push this out of data prep?)
    # for counts, range should be min - 10%, max + 10% (range is (0, 100) for percents)
    count_or_pct = query_return_df['count_or_pct'].unique().item()
    if count_or_pct == 'count':
        range_vals = (min(query_return_df['VALUE']) * 0.9, max(query_return_df['VALUE']) * 1.1)
    # for percents, range should be 0-100
    elif count_or_pct == 'percent':
        range_vals = (0.0, 100.0)
    else:
        raise ValueError('Demographics data should contain only counts or percents.')

    ###########################################################
    # RETURN DATA PROCESSING -- AESTHETICS FOR ALL SUBPLOTS ##
    ###########################################################

    # parse the units themselves; dollars use label_template "currency" and all others use "not_currency"
    if query_return_df['units'].unique().item() == 'dollars':
        label_template = currency
        # division is done in formatting helper but could be pushed up to .db file
        label_units = query_return_df[
                          'units_display'].unique().item() + ' (1000s of dollars)'
    else:
        label_template = not_currency
        label_units = query_return_df['units_display'].unique().item()

    #################################################################################
    # RETURN DATA PROCESSING -- CALCULATE HISTOGRAMS AND FINALIZE PLOT AESTHETICS ##
    #################################################################################

    # set up response dictionary
    data_response = {
        'fig_aes': {
            'yrange': range_vals,
            'xrange': (0, 0),  # for horizontal boxplots, updated dynamically
            'geotype': query_return_df['GEOTYPE'].unique().item(),
            'label_units': label_units,
            'bar_labels': None,
            'bar_centers': None,
            'focal_display': None,
        },
        'years': {
            i: {'focal_value': None,
                'mean': None,
                'median': None,
                'bars': [None]} for i in range(2011, 2020)}
    }
    for year in range(2010, 2020):
        data = query_return_df[query_return_df['YEAR'] == year]['VALUE'].values
        data = data[np.logical_not(np.isnan(data))]

        if len(data) > 0:
            hbar, bar_center, bar_label = hist_to_bar(
                data,
                range_vals=range_vals,
                label_template=label_template
            )

            ####################
            # UNIQUE BY YEAR ##
            ####################
            data_response['years'][year]['mean'] = np.mean(data)
            data_response['years'][year]['median'] = np.quantile(data, q=[0.5]).item()
            data_response['years'][year]['bars'] = hbar

            #######################################################
            # SHARED BY ALL SUBPLOTS BUT DYNAMICALLY CALCUALTED ##
            #######################################################

            # update the max xrange to the greater of (prior max, new height + 10%)
            data_response['fig_aes']['xrange'] = (0, max(data_response['fig_aes']['xrange'][1], max(hbar) * 1.1))

            ############################
            # SHARED BY ALL SUBPLOTS ##
            ############################

            # bar labels and centers will always be the same; add the first time and double check all subsequent times
            if not data_response['fig_aes']['bar_labels']:
                data_response['fig_aes']['bar_labels'] = bar_label
                data_response['fig_aes']['bar_centers'] = bar_center
            else:
                assert data_response['fig_aes']['bar_labels'] == bar_label
                assert data_response['fig_aes']['bar_centers'] == bar_center

    return data_response


def update_focal_area(display_dict, focal_data):
    #############################################
    # GET DISPLAY TEXT FOR SPECIFIC GEOGRAPHY ##
    #############################################

    if focal_data['geo_display'].unique().item():
        display_name = focal_data['geo_display'].unique().item()
    else:
        display_name = focal_data['GEOID'].unique().item()

    ##########################################################
    # CONVERT VALUES TO DICTIONARY AND ADD TO DISPLAY DICT ##
    ##########################################################

    focal_dict = focal_data[['YEAR', 'VALUE']].set_index('YEAR').transpose().to_dict(orient='records')[0]
    display_dict['fig_aes']['focal_display'] = display_name
    for year in range(2011, 2020):
        try:
            focal_val = focal_dict[year]
        except KeyError:
            focal_val = None

        display_dict['years'][year]['focal_value'] = focal_val

    return display_dict


dollars_example = dict(
    area='county',
    report_type='demographics',
    unit='count',
    variable='PCI'
)

# QUERY
dollars_query = yearly_data_query.format(**dollars_example)
dollars_data = pd.read_sql_query(dollars_query, db_conn)

# MUNGE DATA
dollars_hist_data = demographic_data_prep(dollars_data)

count_example = dict(
    area='tract',
    report_type='demographics',
    unit='count',
    variable='AGE17'
)

# QUERY
count_query = yearly_data_query.format(**count_example)
count_data = pd.read_sql_query(count_query, db_conn)

# MUNGE DATA
count_hist_data = demographic_data_prep(count_data)

percent_example = dict(
    area='tract',
    report_type='demographics',
    unit='percent',
    variable='AGE17'
)

# QUERY
percent_query = yearly_data_query.format(**percent_example)
percent_data = pd.read_sql_query(percent_query, db_conn)

# MUNGE DATA
percent_hist_data = demographic_data_prep(percent_data)

# FOCAL AREA QUERY
# update existing user inputs with a new value, the focal county
# in this example, make a new query to the sqlite db
# alternatively, the existing return data could be filtered in pandas
dollars_example['focal_area'] = 'Tarrant County'
focal_query = focal_query.format(**dollars_example)
focal_data = pd.read_sql_query(focal_query, db_conn)

# UPDATE PLOT DICTIONARY
focal_dict = update_focal_area(
    dollars_hist_data,
    focal_data
)

print(focal_dict)
