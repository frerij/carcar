from django.shortcuts import render

from .models import Customer, Sale, SalesPerson, AutomobileVO
from django.http import JsonResponse
from django.views.decorators.http import require_http_methods
import json

from .encoders import (
    SalesPersonDetailEncoder,
    CustomerDetailEncoder,
    SaleDetailEncoder,
)

@require_http_methods(["GET", "POST"])
def api_sales_person(request):
    if request.method == "GET":
        salespeople = SalesPerson.objects.all()
        return JsonResponse(
            {"Sales_People": salespeople},
            encoder=SalesPersonDetailEncoder,
        )
    else:
        try:
            content = json.loads(request.body)
            sales_person = SalesPerson.objects.create(**content)
            return JsonResponse(
                sales_person,
                encoder=SalesPersonDetailEncoder,
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
            encoder=CustomerDetailEncoder,
        )
    else:
        try:
            content = json.loads(request.body)
            customer = Customer.objects.create(**content)
            return JsonResponse(
                customer,
                encoder=CustomerDetailEncoder,
                safe=False,
            )
            
        except:
            response = JsonResponse(
                {"message": "Could not add customer"}
            )
            response.status_code = 400
            return response

@require_http_methods(["GET", "POST"])
def api_sales(request):
    if request.method == "GET":
        sales = Sale.objects.all()
        return JsonResponse(
            {"Sales": sales},
            encoder=SaleDetailEncoder,
        )
    else:
        try:
            content = json.loads(request.body)
            try:
                auto_href = content["automobile"]
                automobile = AutomobileVO.objects.get(import_href=auto_href)
                content["automobile"] = automobile
            except AutomobileVO.DoesNotExist:
                return JsonResponse(
                {"message": "Invalid automobile id"},
                status=400,
            )

            sale = Sale.objects.create(**content)
            return JsonResponse(
                sale,
                encoder=SaleDetailEncoder,
                safe=False,
            )
            
        except:
            response = JsonResponse(
                {"message": "Could not add sale"}
            )
            response.status_code = 400
            return response