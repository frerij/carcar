import datetime
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
        "id",
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
        "is_vip",
        "is_finished",
    ]
    encoders = {
        "assigned_tech": TechnicianListEncoder
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
            {"technicians": technicians},
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


@require_http_methods(["GET", "DELETE"])
def api_detail_technician(request, pk):
    if request.method == "GET":
        try:
            technician = Technician.objects.get(id=pk)
            return JsonResponse(
                technician, 
                encoder=TechnicianListEncoder, 
                safe=False
            )
            
        except Technician.DoesNotExist:    
            response = JsonResponse(
                {"message": "Not a valid technican"}
            )
            response.status_code=404
            return response
    
    else:
        count, _ = Technician.objects.filter(id=pk).delete()
        return JsonResponse({"deleted": count > 0})


@require_http_methods(["GET", "POST"])
def api_appointment(request):
    if request.method == "GET":
        appointments = Appointment.objects.all()
        return JsonResponse(
            {"appointments": appointments},
            encoder=AppointmentEncoder
        )
    else:
        try:
            content = json.loads(request.body)

            technician = Technician.objects.get(tech_num=content["technician"])
            content["technician"] = technician

            vin = AutomobileVO.objects.get(vin=content["vin"])
            content["vin"] = vin

            appointment = Appointment.objects.create(**content)
            print(content)
            return JsonResponse(
                appointment,
                encoder=AppointmentEncoder,
                safe=False,
            )
        except:
            response = JsonResponse(
                {"message": "Could not add an appointment"}
            )
            response.status_code = 400
            return response

@require_http_methods(["GET", "PUT", "DELETE"])
def api_detail_appointment(request, pk):
    if request.method == "GET":
        try:
            appointment = Appointment.objects.get(id=pk)
            return JsonResponse(
                appointment, 
                encoder=AppointmentEncoder, 
                safe=False
            )
            
        except Appointment.DoesNotExist:    
            response = JsonResponse(
                {"message": "Not a valid appointment"}
            )
            response.status_code=404
            return response
    
    else:
        count, _ = Appointment.objects.filter(id=pk).delete()
        return JsonResponse({"deleted": count > 0})