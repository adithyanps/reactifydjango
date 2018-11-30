"""reactify URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/2.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.views.generic import TemplateView
from django.urls import path, include, re_path
from django.conf.urls import url
from rest_framework.urlpatterns import format_suffix_patterns
from vehicle import views
urlpatterns = [
    path('', TemplateView.as_view(template_name='react.html')),
    re_path(r'^saved/', TemplateView.as_view(template_name='react.html')),
    re_path(r'^Show/', TemplateView.as_view(template_name='react.html')),
    re_path(r'^saved/update', TemplateView.as_view(template_name='react.html')),

    path('admin/', admin.site.urls),
    path('api/posts/', include('posts.urls')),
    path('vehicle/', include('vehicle.urls')),

]

    # path('brand/', include('vehicle.urls')),
    # path('model/', include('vehicle.urls')),




    # path('brand/',views.BrandList.as_view()),
