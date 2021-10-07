from django.conf.urls import url
from protx.data.api import views

app_name = 'protx_api'
urlpatterns = [
    url('maltreatment/', views.get_maltreatment, name='data'),
    url('demographics/', views.get_demographics, name='data')
]
