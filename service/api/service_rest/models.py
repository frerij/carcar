from django.db import models
from pkg_resources import parse_requirements


# Create your models here.


class AutomobileVO(models.Model):
    color = models.CharField(max_length=50)
    year = models.PositiveSmallIntegerField()
    vin = models.CharField(max_length=17, unique=True)

    def __str__(self):
        return self.vin


class Technician(models.Model):
    tech_name = models.CharField(max_length=200)
    tech_num = models.PositiveSmallIntegerField(unique=True)

    def __str__(self):
        return self.tech_name


class Appointment(models.Model):
    owner_name = models.CharField(max_length=200)
    vin = models.CharField(max_length=17, null=True, unique=True)
    date = models.DateField(auto_now=False)
    time = models.TimeField(auto_now=False)
    reason = models.TextField()
    is_vip = models.BooleanField(default=False)
    is_finished = models.BooleanField(default=False)

    assigned_tech = models.ForeignKey(
        Technician,
        related_name="technician",
        on_delete=models.PROTECT
    )

    def __str__(self):
        return self.reason + "for " + self.owner_name
    

