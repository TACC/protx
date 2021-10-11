from django.conf.urls import url
from django.urls import path
from protx.data.api import views

app_name = 'protx_api'
urlpatterns = [
    url('display/', views.get_display, name='data'),
    url('maltreatment/', views.get_maltreatment, name='data'),
    url('demographics/', views.get_demographics, name='data'),
    path('demographics-plot-distribution/<area>/<variable>/<unit>/', views.get_demographics_distribution_plot_data, name='data')
]
