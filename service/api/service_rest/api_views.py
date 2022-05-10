from django.shortcuts import render

# Create your views here.
from .models import Technician, Appointment, AutomobileVO
from common.json import ModelEncoder
from django.http import JsonResponse
from django.views.decorators.http import require_http_methods
import json

class TechnicianListEncoder(ModelEncoder):
    model = Technician
    properties = [
        "tech_name",
        "tech_num",
    ]

class AppointmentEncoder(ModelEncoder):
    model = Appointment
    properties = [
        "id",
        "owner_name",
        "vin",
        "date",
        "time",
        "reason",
        "assigned_tech",
    ]
    encoders = {
        "technician": TechnicianListEncoder
    }

class AutomobileEncoder(ModelEncoder):
    model = AutomobileVO
    properties =[
        "vin",
        "import_href"
    ]

@require_http_methods(["GET", "POST"])
def api_list_technician(request):
    if request.method == "GET":
        technicians = Technician.objects.all()
        return JsonResponse(
            {"Technicians": technicians},
            encoder=TechnicianListEncoder
        )
    else:
        try:
            content = json.loads(request.body)
            technician = Technician.objects.create(**content)
            print(content)
            return JsonResponse(
                technician,
                encoder=TechnicianListEncoder,
                safe=False,
            )
        except:
            response = JsonResponse(
                {"message": "Could not add a technician"}
            )
            response.status_code = 400
            return response