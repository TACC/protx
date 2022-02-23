from django.conf.urls import url
from django.urls import path
from protx.data.api import views

app_name = 'protx_api'

"""
TODO: Distinguish between URL payload arguments for maltreatment and analytics.
"""

urlpatterns = [
    url('analytics/', views.get_analytics, name='data'),
    path('analytics-plot-distribution/<area>/<geoid>/<variable>/<unit>/', views.get_analytics_distribution_plot_data, name='data'),

    url('demographics/', views.get_demographics, name='data'),
    path('demographics-plot-distribution/<area>/<geoid>/<variable>/<unit>/', views.get_demographics_distribution_plot_data, name='data'),

    url('display/', views.get_display, name='data'),

    url('maltreatment/', views.get_maltreatment, name='data'),
    path('maltreatment-plot-distribution/', views.get_maltreatment_distribution_plot_data, name='data'),

    url('resources/', views.get_resources, name='data')
]
