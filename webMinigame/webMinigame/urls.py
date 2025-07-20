"""
URL configuration for webMinigame project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.2/topics/http/urls/
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
from django.urls import path, include, re_path
from django.conf import settings
from django.conf.urls import handler404, handler403, handler400, handler500
from django.conf.urls.static import static
from django.shortcuts import render

def custom_404_view(request, exception=None):
    return render(request, "404.html", status=404)
def custom_403_view(request, exception=None):
    return render(request, "403.html", status=403)
def custom_500_view(request, exception=None):
    return render(request, "500.html", status=500)
def custom_400_view(request, exception=None):
    return render(request, "400.html", status=400)
handler404 = custom_404_view
handler403 = custom_403_view
handler400 = custom_400_view
handler500 = custom_500_view
urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include("home.urls")), 
]+ static(settings.MEDIA_URL, document_root = settings.MEDIA_ROOT)
