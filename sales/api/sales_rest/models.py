from django.db import models
from django.forms import CharField
from django.urls import reverse

class Customer(models.Model):
    name = models.CharField(max_length=90)
    address = models.CharField(max_length=90)
    phone_number = models.CharField(max_length=11)

class SalesPerson(models.Model):
    name = models.CharField(max_length=90)
    employee_number = CharField(max_length=90)


class ManufacturerVO(models.Model):
    name = models.CharField(max_length=100, unique=True)

    def get_api_url(self):
        return reverse("api_manufacturer", kwargs={"pk": self.id})


class VehicleModelVO(models.Model):
    name = models.CharField(max_length=100)
    picture_url = models.URLField()

    manufacturer = models.ForeignKey(
        ManufacturerVO,
        related_name="models",
        on_delete=models.CASCADE,
    )

    def get_api_url(self):
        return reverse("api_vehicle_model", kwargs={"pk": self.id})



class AutomobileVO(models.Model):
    color = models.CharField(max_length=50)
    year = models.PositiveSmallIntegerField()
    vin = models.CharField(max_length=17, unique=True)

    model = models.ForeignKey(
        VehicleModelVO,
        related_name="automobiles",
        on_delete=models.CASCADE,
    )

    def get_api_url(self):
        return reverse("api_automobile", kwargs={"vin": self.vin})



class Sale(models.Model):
    automobile = models.ForeignKey(
        AutomobileVO,
        related_name="automobile",
        on_delete=models.PROTECT
    )

    sales_person = models.ForeignKey(
        SalesPerson,
        related_name="sales_person",
        on_delete=models.PROTECT
    )

    customer = models.ForeignKey(
        Customer,
        related_name="customer",
        on_delete=models.PROTECT
    )

    sale_price = models.FloatField()
