import sqlite3
import json
import numpy as np
import pandas as pd
from protx.data.api.utils.plotly_figures import timeseries_lineplot

db_name = '/protx-data/cooks.db'

# Missing methods and Variables.
# This is placeholder methods copypastad from demogrpahics to get scaffolded.


def maltreatment_data_query(area, unit, variable):
    db_conn = sqlite3.connect(db_name)
    selection = {'area': area, 'unit': unit, 'variable': variable, 'report_type': 'maltreatment'}
    query = yearly_data_query.format(**selection)
    query_result = pd.read_sql_query(query, db_conn)
    db_conn.close()
    return query_result


def maltreatment_focal_area_data_query(area, geoid, unit, variable):
    db_conn = sqlite3.connect(db_name)
    selection = {'area': area, 'geoid': geoid, 'unit': unit, 'variable': variable, 'report_type': 'maltreatment'}
    query = focal_query.format(**selection)
    query_result = pd.read_sql_query(query, db_conn)
    db_conn.close()
    return query_result


def maltreatment_simple_lineplot_figure(area, geoid, unit, variable):
    # Get Statewide data.
    state_data = maltreatment_data_query(area, unit, variable)
    # Munge statewide data.
    state_result = maltreatment_data_prep(state_data)

    # Get selected geography data.
    geography_data = maltreatment_focal_area_data_query(area, geoid, unit, variable)

    # Combine statewide and geography data results.
    plot_result = update_focal_area(
        state_result,
        geography_data
    )

    # Generate the plot figure data object.
    plot_figure = timeseries_lineplot(plot_result)
    return json.loads(plot_figure.to_json())
