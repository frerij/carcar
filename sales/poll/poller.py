import django
import os
import sys
import time
import json
import requests

sys.path.append("")
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "sales_project.settings")
django.setup()

# Import models from sales_rest, here.
from sales_rest.models import AutomobileVO, ManufacturerVO, VehicleModelVO

def get_manufacturer():
    response = requests.get("http://inventory-api:8000/api/manufacturers/")
    content = json.loads(response.content)
    for manufacturer in content["manufacturers"]:
        ManufacturerVO.objects.update_or_create(
            import_href=manufacturer["href"],
            defaults={
                "name": manufacturer["name"],
            },
        )

def get_vehicle_model():
    response = requests.get("http://inventory-api:8000/api/models/")
    content = json.loads(response.content)
    for model in content["models"]:
        VehicleModelVO.objects.update_or_create(
            import_href=model["href"],
            defaults={
                "name": model["name"],
                "picture_url": model["picture_url"],
                "manufacturer": ManufacturerVO.objects.get(import_href=model["manufacturer"]["href"]),
            },
        )

def get_automobile():
    response = requests.get("http://inventory-api:8000/api/automobiles/")
    content = json.loads(response.content)
    for auto in content["autos"]:
        AutomobileVO.objects.update_or_create(
            import_href=auto["href"],
            defaults={
                "color": auto["color"],
                "year": auto["year"],
                "vin": auto["vin"],
                "model": VehicleModelVO.objects.get(import_href=auto["model"]["href"]),
            },
        )

def poll():
    while True:
        print('Sales poller polling for data')
        try:
            get_manufacturer()
            get_vehicle_model()
            get_automobile()
        except Exception as e:
            print(e, file=sys.stderr)
        time.sleep(60)


if __name__ == "__main__":
    poll()
