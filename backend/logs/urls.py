from django.urls import path
from .views import start_log_generation, stop_log_generation

urlpatterns = [
    path('start/', start_log_generation, name='start_log_generation'),
    path('stop/', stop_log_generation, name='stop_log_generation'),
]
