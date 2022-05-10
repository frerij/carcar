from django.shortcuts import render

from common.json import ModelEncoder
from .models import Sale, SalesPerson
from django.http import JsonResponse
from django.views.decorators.http import require_http_methods
import json

class SalesPersonEncoder(ModelEncoder):
    model = SalesPerson
    properties = [
        "name",
        "employee_number",
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
