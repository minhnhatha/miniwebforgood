from django.urls import path
from home import views
urlpatterns = [
    path('', views.home, name = "home"),
    path('lead', views.lead_home, name = "lead")
]