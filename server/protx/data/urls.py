from django.urls import path
from protx.data import views

app_name = 'data'
urlpatterns = [
    path('', views.data_map, name='data'),
]
