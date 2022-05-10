from django.shortcuts import render

from common.json import ModelEncoder
from .models import Customer, Sale, SalesPerson
from django.http import JsonResponse
from django.views.decorators.http import require_http_methods
import json

class SalesPersonEncoder(ModelEncoder):
    model = SalesPerson
    properties = [
        "name",
        "employee_number",
    ]

class CustomerEncoder(ModelEncoder):
    model = Customer
    properties = [
        "name",
        "address",
        "phone_number",
    ]

@require_http_methods(["GET", "POST"])
def api_sales_person(request):
    if request.method == "GET":
        salespeople = SalesPerson.objects.all()
        return JsonResponse(
            {"Sales_People": salespeople},
            encoder=SalesPersonEncoder,
        )
    else:
        try:
            content = json.loads(request.body)
            sales_person = SalesPerson.objects.create(**content)
            return JsonResponse(
                sales_person,
                encoder=SalesPersonEncoder,
                safe=False,
            )
            
        except:
            response = JsonResponse(
                {"message": "Could not add salesperson"}
            )
            response.status_code = 400
            return response

@require_http_methods(["GET", "POST"])
def api_customer(request):
    if request.method == "GET":
        customers = Customer.objects.all()
        return JsonResponse(
            {"Customers": customers},
            encoder=CustomerEncoder,
        )
    else:
        try:
            content = json.loads(request.body)
            customer = Customer.objects.create(**content)
            return JsonResponse(
                customer,
                encoder=CustomerEncoder,
                safe=False,
            )
            
        except:
            response = JsonResponse(
                {"message": "Could not add customer"}
            )
            response.status_code = 400
            return response
