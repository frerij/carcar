from common.json import ModelEncoder

from .models import SalesPerson, Customer, Sale, AutomobileVO


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
        "sale_price"
    ]
    encoders = {
        "automobile": AutomobileVODetailEncoder,
    }