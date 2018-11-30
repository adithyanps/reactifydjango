from django.urls import path, re_path
from .views import BrandList,ModelList,Vehicletestlist,VehicleList
from .views import VehicleAPIView,VehicleValueApiView
from django.conf.urls import url

urlpatterns = [
    path('brand/', BrandList.as_view(), name='brand-view'),
    path('model/', ModelList.as_view(), name='model-view'),
    url('api/',VehicleValueApiView.as_view(),name='vehicle-form'),

    url(r'^$',VehicleAPIView.as_view(),name='vehicle-create'),
    url(r'^(?P<id>[\w-]+)/$',VehicleList.as_view(),name='post-vehicle'),
    # url('test/', Vehicletestlist.as_view(), name='vehicle-view'),




]
# url(r'^(?P<id>[\w-]+)/$', Vehicletestlist.as_view(), name='vehicle-view'),
