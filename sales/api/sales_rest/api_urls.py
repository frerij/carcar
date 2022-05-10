from django.urls import path

from .api_views import (
    api_sales_person,

)

urlpatterns = [
    path(
        "salesperson/",
        api_sales_person,
        name="api_sales_person",
    ),
    
]
