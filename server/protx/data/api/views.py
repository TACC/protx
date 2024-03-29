from django.views.decorators.csrf import ensure_csrf_cookie
from django.http import JsonResponse, StreamingHttpResponse
from sqlalchemy import create_engine
import logging
import json
import csv
import geopandas
import psycopg2
import shapely
from datetime import datetime

from protx.data.api import demographics
from protx.data.api import maltreatment
from protx.data.api.decorators import onboarded_required, memoize_db_results
from portal.exceptions.api import ApiException

logger = logging.getLogger(__name__)

# TODO single engine for django instance

# Support county and tract for https://jira.tacc.utexas.edu/browse/COOKS-135
DEMOGRAPHICS_QUERY = "SELECT * FROM demographics d WHERE d.GEOTYPE='county'"

DEMOGRAPHICS_MIN_MAX_QUERY = '''
SELECT
    d.GEOTYPE,
    d.UNITS,
    d.YEAR,
    d.DEMOGRAPHICS_NAME,
    MIN(d.value) AS MIN,
    MAX(d.value) AS MAX
FROM demographics d
WHERE d.GEOTYPE='county'
GROUP BY
    d.GEOTYPE,
    d.UNITS,
    d.YEAR,
    d.DEMOGRAPHICS_NAME;
'''

MALTREATMENT_QUERY = "SELECT * FROM maltreatment"

MALTREATMENT_MIN_MAX_QUERY = '''
SELECT
    m.GEOTYPE,
    m.UNITS,
    m.YEAR,
    m.MALTREATMENT_NAME,
    MIN(m.value) as MIN,
    MAX(m.value) as MAX
FROM maltreatment m
WHERE m.GEOTYPE='county'
GROUP BY
    m.GEOTYPE,
    m.UNITS,
    m.YEAR,
    m.MALTREATMENT_NAME;
'''

cooks_db = '/protx-data/cooks.db'
resources_db = '/protx-data/resources.db'

SQLALCHEMY_DATABASE_URL = 'sqlite:///{}'.format(cooks_db)

SQLALCHEMY_RESOURCES_DATABASE_URL = 'sqlite:///{}'.format(resources_db)

DEMOGRAPHICS_JSON_STRUCTURE_KEYS = ["GEOTYPE", "YEAR", "DEMOGRAPHICS_NAME", "GEOID"]

MALTREATMENT_JSON_STRUCTURE_KEYS = ["GEOTYPE", "YEAR", "MALTREATMENT_NAME", "GEOID"]


def create_dict(data, level_keys):
    """Create n-level hierarchical/nested dictionaries from search result

    Parameters
    ----------
    data : iterable
        data
    level_keys : str iterable
        List of column keys for each level of nested dictionaries.

    Returns
    -------
    dict

    """
    result = {}
    for i, row in enumerate(data):
        current_level = result
        # iterate over level keys and create nested dictionary
        for k in level_keys[:-1]:
            if row[k] not in current_level:
                current_level[row[k]] = {}
            current_level = current_level[row[k]]

        # the most nested dictionary is either the value for a unit or the min/max of that unit
        if "MAX" in row:
            value_key = row["UNITS"]
            if row["MIN"] is None or row["MAX"] is None:
                logger.error("max/min problem with this row: {}".format(row))
                continue
            value = {key.lower(): int(row[key]) if value_key == "count" else row[key] for key in ["MAX", "MIN"]}
        elif "VALUE" in row:
            value_key = row["UNITS"]
            value = row["VALUE"]

            if value is None:
                continue

            # workaround as count values are stored as floats
            if value_key == "count":
                value = int(value)
        else:
            raise ApiException("Problem with this row: {}".format(row))

        values = {value_key: value}

        # set the values at last key
        last_key = str(row[level_keys[-1]])
        if last_key in current_level:
            current_level[last_key].update(values)
        else:
            current_level[last_key] = values
    return result


@onboarded_required
@ensure_csrf_cookie
def get_analytics(request):
    return {}


@onboarded_required
@ensure_csrf_cookie
def get_demographics(request):
    return get_demographics_cached()


@memoize_db_results(db_file=demographics.db_name)
def get_demographics_cached():
    """Get demographics data

    """
    engine = create_engine(SQLALCHEMY_DATABASE_URL, connect_args={'check_same_thread': False})

    with engine.connect() as connection:
        result = connection.execute(DEMOGRAPHICS_QUERY)
        data = create_dict(result, level_keys=DEMOGRAPHICS_JSON_STRUCTURE_KEYS)
        result = connection.execute(DEMOGRAPHICS_MIN_MAX_QUERY)
        meta = create_dict(result, level_keys=DEMOGRAPHICS_JSON_STRUCTURE_KEYS[:-1])
        return JsonResponse({"data": data, "meta": meta})


@onboarded_required
@ensure_csrf_cookie
def get_maltreatment(request):
    return get_maltreatment_cached()


@memoize_db_results(db_file=maltreatment.db_name)
def get_maltreatment_cached():
    """Get maltreatment data

    """
    engine = create_engine(SQLALCHEMY_DATABASE_URL, connect_args={'check_same_thread': False})

    with engine.connect() as connection:
        result = connection.execute(MALTREATMENT_QUERY)
        data = create_dict(result, level_keys=MALTREATMENT_JSON_STRUCTURE_KEYS)
        result = connection.execute(MALTREATMENT_MIN_MAX_QUERY)
        meta = create_dict(result, level_keys=MALTREATMENT_JSON_STRUCTURE_KEYS[:-1])
        return JsonResponse({"data": data, "meta": meta})


@onboarded_required
@ensure_csrf_cookie
def get_demographics_distribution_plot_data(request, area, geoid, variable, unit):
    """Get demographics distribution data for plotting
    """
    logger.info("Getting demographic plot data for {} {} {} {}".format(area, geoid, variable, unit))
    result = demographics.demographics_simple_lineplot_figure(area=area, geoid=geoid, variable=variable, unit=unit)
    return JsonResponse({"result": result})


@onboarded_required
@ensure_csrf_cookie
def get_maltreatment_distribution_plot_data(request):
    """Get maltreatment distribution data for plotting
    """
    body = json.loads(request.body)
    area = body["area"]
    selectedArea = body["selectedArea"]
    geoid = body["geoid"]
    variables = body["variables"]
    unit = body["unit"]
    logger.info("Getting maltreatment plot data for {} {} {} on the variables: {}".format(area, selectedArea, unit,
                                                                                          variables))  # geoid
    result = maltreatment.maltreatment_plot_figure(area=area, selectedArea=selectedArea, geoid=geoid,
                                                   variables=variables, unit=unit)
    return JsonResponse({"result": result})


@onboarded_required
def get_display(request):
    """Get display information data
    """
    engine = create_engine(SQLALCHEMY_DATABASE_URL, connect_args={'check_same_thread': False})

    with engine.connect() as connection:
        display_data = connection.execute("SELECT * FROM display_data")
        result = []
        for variable_info in display_data:
            var = dict(variable_info)
            # Interpret some variables used to control dropdown population https://jira.tacc.utexas.edu/browse/COOKS-148
            for boolean_var_key in ["DISPLAY_DEMOGRAPHIC_COUNT", "DISPLAY_DEMOGRAPHIC_RATE",
                                    "DISPLAY_MALTREATMENT_COUNT", "DISPLAY_MALTREATMENT_RATE"]:
                current_value = var[boolean_var_key]
                var[boolean_var_key] = True if (current_value == 1 or current_value == "1") else False
            result.append(var)
        return JsonResponse({"variables": result})


@onboarded_required
def get_resources(request):
    """Get display information data
    """
    return get_resources_cached()


_DESIRED_FIELDS = ["NAME", "CITY", "STATE", "POSTAL_CODE", "PHONE", "WEBSITE", "LATITUDE", "LONGITUDE", "NAICS_CODE"]


class Echo:
    """An object that implements just the write method of the file-like
    interface.
    """

    def write(self, value):
        """Write the value by returning it, instead of storing in a buffer."""
        return value


@onboarded_required
def download_resources(request, area, geoid):
    """Get display information data
    """
    selected_naics_codes = request.GET.getlist("naicsCode")

    if area != "county":
        # currently assuming county and query is hardcoded for "texas_counties"
        raise ApiException("Only downloading counties is supported")

    connection = psycopg2.connect(database="postgres", user="postgres", password="postgres", host="protx_geospatial")
    query = "select * from texas_counties where texas_counties.geo_id='{}'".format(geoid)
    county_dataframe = geopandas.GeoDataFrame.from_postgis(query, connection, geom_col='geom')
    county_name = county_dataframe.iloc[0]["name"]
    connection.close()

    def generate_csv_rows():
        # header row
        yield _DESIRED_FIELDS + ["NAICS_DESCRIPTION"]

        resources_result, display_result = get_resources_and_display(naics_codes=selected_naics_codes)

        naics_to_description = {d["NAICS_CODE"]: d["DESCRIPTION"] for d in display_result}

        for r in resources_result:
            long = r["LONGITUDE"]
            lat = r["LATITUDE"]
            if lat and long:  # some resources are missing position
                point = shapely.geometry.Point(long, lat)
                if county_dataframe.contains(point).any():
                    row = [r[key] for key in _DESIRED_FIELDS] + [naics_to_description[r["NAICS_CODE"]]]
                    yield row

    pseudo_buffer = Echo()
    writer = csv.writer(pseudo_buffer)
    response = StreamingHttpResponse(
        (writer.writerow(row) for row in generate_csv_rows()),
        content_type="text/csv",
    )

    # datetime object containing current date and time
    timestamp = datetime.now().strftime("%d_%m_%Y_%H_%M")
    filename = f"{county_name}_{area}_resources_{timestamp}.csv"
    response['Content-Disposition'] = 'attachment; filename="{}"'.format(filename)
    return response


@memoize_db_results(db_file=resources_db)
def get_resources_and_display(naics_codes=None):
    """
    Get resources and related metadata

    if naics_codes, then limit the resources returned to those
    that have a NAICS_CODE in naics_codes
    """
    engine = create_engine(SQLALCHEMY_RESOURCES_DATABASE_URL, connect_args={'check_same_thread': False})
    with engine.connect() as connection:
        resource_query = "SELECT * FROM business_locations"
        if naics_codes:
            resource_query += " r WHERE r.NAICS_CODE IN ({})".format(
                ','.join(['"{}"'.format(code) for code in naics_codes]))

        resources = connection.execute(resource_query)
        resources_result = []
        for r in resources:
            resources_result.append(dict(r))
        meta = connection.execute("SELECT * FROM business_menu")
        display_result = []
        for m in meta:
            display_result.append(dict(m))
    return resources_result, display_result


@memoize_db_results(db_file=resources_db)
def get_resources_cached():
    resources_result, display_result = get_resources_and_display()
    return JsonResponse({"resources": resources_result, "display": display_result})
