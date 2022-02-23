from django.views.decorators.csrf import ensure_csrf_cookie
from django.http import JsonResponse
from sqlalchemy import create_engine
import logging

from protx.data.api import analytics
from protx.data.api import demographics
from protx.data.api import maltreatment
from protx.data.api.decorators import onboarded_required, memoize_db_results
from portal.exceptions.api import ApiException


logger = logging.getLogger(__name__)

# TODO single engine for django instance

ANALYTICS_QUERY = "SELECT * FROM analytics d WHERE d.GEOTYPE='county'"

ANALYTICS_MIN_MAX_QUERY = '''
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

MALTREATMENT_QUERY = '''
SELECT
    d.VALUE,
    d.GEOID,
    d.GEOTYPE,
    d.MALTREATMENT_NAME,
    d.YEAR,
    d.UNITS as count_or_pct,
    g.DISPLAY_TEXT as geo_display,
    u.UNITS as units,
    u.DISPLAY_TEXT as units_display
FROM maltreatment d
LEFT JOIN display_geotype g ON
    g.GEOID = d.GEOID AND
    g.GEOTYPE = d.GEOTYPE AND
    g.YEAR = d.YEAR
JOIN display_data u ON
    d.MALTREATMENT_NAME = u.NAME
WHERE d.GEOTYPE = "{area}" AND
    g.DISPLAY_TEXT = "{focal_area}" AND
    d.MALTREATMENT_NAME IN ({variable}) AND
    d.units = "{units}";
'''

cooks_db = '/protx-data/cooks.db'
resources_db = '/protx-data/resources.db'

SQLALCHEMY_DATABASE_URL = 'sqlite:///{}'.format(cooks_db)

SQLALCHEMY_RESOURCES_DATABASE_URL = 'sqlite:///{}'.format(resources_db)

ANALYTICS_JSON_STRUCTURE_KEYS = ["GEOTYPE", "YEAR", "DEMOGRAPHICS_NAME", "GEOID"]

DEMOGRAPHICS_JSON_STRUCTURE_KEYS = ["GEOTYPE", "YEAR", "DEMOGRAPHICS_NAME", "GEOID"]

MALTREATMENT_JSON_STRUCTURE_KEYS = ["GEOID"]


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
    return get_analytics_cached()


@memoize_db_results(db_file=analytics.db_name)
def get_analytics_cached():
    """Get analytics data
    """
    # TODO: Wire up data query.
    engine = create_engine(SQLALCHEMY_DATABASE_URL, connect_args={'check_same_thread': False})

    with engine.connect() as connection:
        result = connection.execute(ANALYTICS_QUERY)
        data = create_dict(result, level_keys=ANALYTICS_JSON_STRUCTURE_KEYS)

        result = connection.execute(ANALYTICS_MIN_MAX_QUERY)
        meta = create_dict(result, level_keys=ANALYTICS_JSON_STRUCTURE_KEYS[:-1])
        return JsonResponse({"data": data, "meta": meta})
    # return JsonResponse({"data": {}, "meta": {}})


@ onboarded_required
@ ensure_csrf_cookie
def get_demographics(request):
    return get_demographics_cached()


@ memoize_db_results(db_file=demographics.db_name)
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


@ onboarded_required
@ ensure_csrf_cookie
def get_maltreatment(request):
    return get_maltreatment_cached()


@ memoize_db_results(db_file=maltreatment.db_name)
def get_maltreatment_cached():
    """Get maltreatment data

    """
    engine = create_engine(SQLALCHEMY_DATABASE_URL, connect_args={'check_same_thread': False})

    with engine.connect() as connection:
        result = connection.execute(MALTREATMENT_QUERY)
        print(result)
        # data = create_dict(result, level_keys=MALTREATMENT_JSON_STRUCTURE_KEYS)

        # result = connection.execute(MALTREATMENT_MIN_MAX_QUERY)
        # meta = create_dict(result, level_keys=MALTREATMENT_JSON_STRUCTURE_KEYS[:-1])
        data = {}
        meta = {}
        return JsonResponse({"data": data, "meta": meta})


@ onboarded_required
@ ensure_csrf_cookie
def get_analytics_distribution_plot_data(request, area, geoid, variable, unit):
    """Get analytics distribution data for plotting
    """
    logger.info("Getting analytics plot data for {} {} {} {}".format(area, geoid, variable, unit))
    result = analytics.analytics_simple_lineplot_figure(area=area, geoid=geoid, variable=variable, unit=unit)
    return JsonResponse({"result": result})


@ onboarded_required
@ ensure_csrf_cookie
def get_demographics_distribution_plot_data(request, area, geoid, variable, unit):
    """Get demographics distribution data for plotting
    """
    # TODO: Wire up correct figure rendering method.
    logger.info("Getting demographic plot data for {} {} {} {}".format(area, geoid, variable, unit))
    result = demographics.demographics_simple_lineplot_figure(area=area, geoid=geoid, variable=variable, unit=unit)
    return JsonResponse({"result": result})


@ onboarded_required
@ ensure_csrf_cookie
def get_maltreatment_distribution_plot_data(request, area, selectedArea, variable, unit, malTypes):
    """Get maltreatment distribution data for plotting
    """
    logger.info("Getting maltreatment plot data for {} {} {} {} {}".format(area, selectedArea, variable, unit, malTypes))
    result = maltreatment.maltreatment_plot_figure(area=area, selectedArea=selectedArea, variable=variable, unit=unit, malTypes=malTypes)
    return JsonResponse({"result": result})


@ onboarded_required
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


@ onboarded_required
def get_resources(request):
    """Get display information data
    """
    return get_resources_cached()


@ memoize_db_results(db_file=resources_db)
def get_resources_cached():
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
