from django.conf.urls import url
from protx.data import views

app_name = 'data'
urlpatterns = [
    url('/?', views.data_map, name='data'),
]
