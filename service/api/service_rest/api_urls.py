from django.urls import path

from .api_views import (
    api_list_technician
)

urlpatterns = [
    path(
        "technicians/",
        api_list_technician,
        name="api_list_technician"
    ),
]