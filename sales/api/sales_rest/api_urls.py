from django.urls import path

from .api_views import (
    api_sales_person,
    api_customer,
    api_sales,

)

urlpatterns = [
    path(
        "salesperson/",
        api_sales_person,
        name="api_sales_person",
    ),
    path(
        "customer/",
        api_customer,
        name="api_customer",
    ),
    path(
        "sales/",
        api_sales,
        name="api_sales",
    )
]
