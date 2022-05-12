from django.shortcuts import render

from .models import Customer, Sale, SalesPerson, AutomobileVO, VehicleModelVO
from django.http import JsonResponse
from django.views.decorators.http import require_http_methods
import json

from .encoders import (
    SalesPersonDetailEncoder,
    CustomerDetailEncoder,
    SaleDetailEncoder,
    AutomobileVODetailEncoder
)
@require_http_methods(["GET", "POST"])
def api_automobiles(request):
    if request.method == "GET":
        autos = AutomobileVO.objects.all()
        return JsonResponse(
            {"autos": autos},
            encoder=AutomobileVODetailEncoder,
        )
    else:
        try:
            content = json.loads(request.body)
            model_id = content["model_id"]
            model = VehicleModelVO.objects.get(pk=model_id)
            content["model"] = model
            auto = AutomobileVO.objects.create(**content)
            return JsonResponse(
                auto,
                encoder=AutomobileVODetailEncoder,
                safe=False,
            )
        except:
            response = JsonResponse(
                {"message": "Could not create the automobile"}
            )
            response.status_code = 400
            return response

@require_http_methods(["GET", "POST"])
def api_sales_person(request):
    if request.method == "GET":
        salespeople = SalesPerson.objects.all()
        return JsonResponse(
            {"sales_people": salespeople},
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
            {"customers": customers},
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
            {"sales": sales},
            encoder=SaleDetailEncoder,
        )
    else:
        try:
            content = json.loads(request.body)
            
            try:
                auto_href = content["automobile"]
                automobile = AutomobileVO.objects.get(import_href=auto_href)
                content["automobile"] = automobile

                automobile.sold = True
                automobile.save()

                customer_phone = content["customer"]
                customer = Customer.objects.get(phone_number=customer_phone)
                content["customer"] = customer
                
                sale_person_id = content["sales_person"]
                salesPerson = SalesPerson.objects.get(employee_number=sale_person_id)
                content["sales_person"] = salesPerson
                
            except:
                return JsonResponse(
                {"message": "Invalid request"},
                status=400,
            )
            
            sale = Sale.objects.create(**content)

            return JsonResponse(
                sale,
                encoder=SaleDetailEncoder,
                safe=False,
            )

          
            
            
        except Exception as e:
            print("this is the exception error msg", e)
            response = JsonResponse(
                {"message": "Could not add sale"}
            )
            response.status_code = 400
            return response