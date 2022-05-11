from django.urls import path

from .api_views import (
    api_list_technician,
    api_appointment,
    api_detail_technician,
    api_detail_appointment
)

urlpatterns = [
    path(
        "technicians/",
        api_list_technician,
        name="list_technician"
    ),
    path(
        "technicians/<int:pk>/",
        api_detail_technician,
        name="show_technician"
    ),
    path(
        "appointments/",
        api_appointment,
        name="list_appointments"
    ),
    path(
        "appointments/<int:pk>/",
        api_detail_appointment,
        name="show_appointment"
    ),
]