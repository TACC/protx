from django.conf.urls import url
from protx.data.api import views

app_name = 'protx_api'
urlpatterns = [
    url('display/', views.get_display, name='data'),
    url('maltreatment/', views.get_maltreatment, name='data'),
    url('demographics/', views.get_demographics, name='data')
]
