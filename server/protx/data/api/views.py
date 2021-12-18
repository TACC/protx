from django.views.decorators.csrf import ensure_csrf_cookie
from django.http import JsonResponse
from sqlalchemy import create_engine
import logging

from protx.data.api import demographics
from protx.data.api.decorators import onboarded_required
from portal.exceptions.api import ApiException


logger = logging.getLogger(__name__)

# TODO single engine for django instance


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
GROUP BY
    m.GEOTYPE,
    m.UNITS,
    m.YEAR,
    m.MALTREATMENT_NAME;
'''

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

SQLALCHEMY_DATABASE_URL = 'sqlite:////protx-data/cooks.db'
SQLALCHEMY_RESOURCES_DATABASE_URL = 'sqlite:////protx-data/resources.db'

MALTREATMENT_JSON_STRUCTURE_KEYS = ["GEOTYPE", "YEAR", "MALTREATMENT_NAME", "GEOID"]
DEMOGRAPHICS_JSON_STRUCTURE_KEYS = ["GEOTYPE", "YEAR", "DEMOGRAPHICS_NAME", "GEOID"]


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
def get_maltreatment(request):
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
def get_demographics(request):
    """Get maltreatment data

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
def get_demographics_distribution_plot_data(request, area, variable, unit):
    """Get demographics distribution data for plotting

    """
    logger.info("Getting demographic distribution data for {} {} {}".format(area, variable, unit))
    # result = demographics.demographic_histogram_data(area=area, variable=variable, unit=unit)
    # Call the new simple lineplot method instead.
    # Return the figure data object as JSON to the front end for rendering.
    result = demographics.demographics_simple_lineplot_figure(area=area, variable=variable, unit=unit)
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
    engine = create_engine(SQLALCHEMY_RESOURCES_DATABASE_URL, connect_args={'check_same_thread': False})
    with engine.connect() as connection:
        resources = connection.execute("SELECT * FROM business_locations")
        resources_result = []
        for r in resources:
            resources_result.append(dict(r))
        meta = connection.execute("SELECT * FROM business_menu")
        display_result = []
        for m in meta:
            display_result.append(dict(m))
    return JsonResponse({"resources": resources_result, "display": display_result})
