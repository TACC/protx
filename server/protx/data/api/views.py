from django.views.decorators.csrf import ensure_csrf_cookie
from django.http import JsonResponse
from sqlalchemy import create_engine

# TODO single engine for django instance
# TODO add login decorator or note for future about that


MALTREATMENT_QUERY = "select * from maltreatment"

MALTREATMENT_MIN_MAX_QUERY = '''
SELECT
    m.GEOTYPE,
    m.UNITS,
    m.YEAR,
    m.MALTREATMENT_NAME,
    MIN(m.value) as MIN,
    MAX(m.value) as MAX
FROM maltreatment m
group by
    m.GEOTYPE,
    m.UNITS,
    m.YEAR,
    m.MALTREATMENT_NAME;
'''

SQLALCHEMY_DATABASE_URL = 'sqlite:////srv/www/portal/server/test_20210907.db'
MALTREATMENT_JSON_STRUCTURE_KEYS = ["GEOTYPE", "YEAR", "MALTREATMENT_NAME", "GEOID"]


def create_dict(data, level_keys, row_limit=None):
    """Create n-level hierarchical/nested dictionaries from search result

    Parameters
    ----------
    data : iterable
        data
    level_keys : str iterable
        List of column keys for each level of nested dictionaries.
    row_limit : int
        If given, only create dict for this many rows

    Returns
    -------
    dict

    """
    result = {}
    for i, row in enumerate(data):
        if row_limit and i > row_limit:
            break

        current_level = result
        # iterate over level keys and create nested dictionary
        for k in level_keys[:-1]:
            if row[k] not in current_level:
                current_level[row[k]] = {}
            current_level = current_level[row[k]]

        # the most nested dictionary is either the value for a unit or the min/max of that unit
        if "MAX" in row:
            value_key = row["UNITS"]
            value = {key: int(row[key]) if value_key == "count" else row[key] for key in ["MIN", "MAX"]}
        else:
            value_key = row["UNITS"]
            value = row["VALUE"]

            # workaround as count values are stored as floats
            if value_key == "count":
                value = int(value)
        values = {value_key: value}

        # set the values at last key
        last_key = str(row[level_keys[-1]])
        if last_key in current_level:
            current_level[last_key].update(values)
        else:
            current_level[last_key] = values
    return result


@ensure_csrf_cookie
def get_maltreatment(request):
    """Get maltreatment data

    """
    engine = create_engine(SQLALCHEMY_DATABASE_URL, connect_args={'check_same_thread': False})

    with engine.connect() as connection:
        result = connection.execute(MALTREATMENT_QUERY)
        maltreatment = create_dict(result, level_keys=MALTREATMENT_JSON_STRUCTURE_KEYS)

        result = connection.execute(MALTREATMENT_MIN_MAX_QUERY)
        meta = create_dict(result, level_keys=MALTREATMENT_JSON_STRUCTURE_KEYS[:-1])
        return JsonResponse({"maltreatment": maltreatment, "meta": meta})