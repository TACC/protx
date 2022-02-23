import sqlite3
import json
import numpy as np
import pandas as pd


db_name = '/protx-data/cooks.db'


def analytics_plot_figure(area, geoid, variable, unit):
    # TODO: Analytics plot logic.
    dummy_plot = {
        "data": [{"type": "bar",
                  "x": [1, 2, 3],
                  "y": [1, 3, 2]}],
        "layout": {"title": {"text": "Analytics"}}
    }
    plot_figure = dict(dummy_plot)
    return plot_figure
