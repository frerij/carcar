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
        "reason",
        "technician",
        "is_vip",
        "is_finished",
    ]
    encoders = {
        "technician": TechnicianListEncoder()
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
            {"appointment": appointments},
            encoder=AppointmentEncoder,
        )
    else:
        content = json.loads(request.body)
        try:
            tech_number = content["technician"]
            technician = Technician.objects.get(tech_num=tech_number)
            content["technician"] = technician 
        except Technician.DoesNotExist:
            return JsonResponse(
                {"message": "Invalid employee id"},
                status = 400,
            )

        vin_number = content["vin"]
        if AutomobileVO.objects.filter(vin=vin_number).exists():
            content["is_vip"] = True
        else:
            content["is_vip"] = False
            print("Not VIP")

        appointments = Appointment.objects.create(**content)
        return JsonResponse(
            appointments,
            encoder = AppointmentEncoder,
            safe=False,
        )

@require_http_methods(["DELETE", "PUT"])
def api_detail_appointment(request, pk):
    if request.method == "DELETE":
        count, _ = Appointment.objects.filter(id=pk).delete()
        print("appointment deleted")
        return JsonResponse({"deleted": count > 0})

    else:
        content = json.loads(request.body)
        Appointment.objects.filter(id=pk).update(**content)
        appointment = Appointment.objects.get(id=pk)
        print("Appointment updated")
        return JsonResponse(
            appointment,
            encoder=AppointmentEncoder,
            safe=False
        )
        