from common.json import ModelEncoder

from .models import SalesPerson, Customer, Sale, AutomobileVO, VehicleModelVO, ManufacturerVO

class ManufacturerVODetailEncoder(ModelEncoder):
    model = ManufacturerVO
    properties = [
        "import_href",
        "name",
    ]

class VehicleVODetailEncoder(ModelEncoder):
    model = VehicleModelVO
    properties = [
        "import_href",
        "name",
        "picture_url",
        "manufacturer",
    ]
    encoders = {
    "manufacturer": ManufacturerVODetailEncoder(),
    }
        
    
class AutomobileVODetailEncoder(ModelEncoder):
    model = AutomobileVO
    properties = [
        "import_href",
        "color",
        "year",
        "vin",
        "model",
        "sold",
    ]
    encoders = {
        "model": VehicleVODetailEncoder(),
    }
        
    
class SalesPersonDetailEncoder(ModelEncoder):
    model = SalesPerson
    properties = [
        "name",
        "employee_number",
    ]

class CustomerDetailEncoder(ModelEncoder):
    model = Customer
    properties = [
        "name",
        "address",
        "phone_number",
    ]

class SaleDetailEncoder(ModelEncoder):
    model = Sale
    properties = [
        "automobile",
        "sales_person",
        "customer",
        "sales_price"
    ]
    encoders = {
        "automobile": AutomobileVODetailEncoder(),
        "sales_person": SalesPersonDetailEncoder(),
        "customer": CustomerDetailEncoder(),
    }