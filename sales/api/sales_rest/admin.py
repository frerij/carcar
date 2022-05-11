from django.contrib import admin

from .models import AutomobileVO, ManufacturerVO, VehicleModelVO

class AutomobileVOAdmin(admin.ModelAdmin):
    pass

class ManufacturerVOAdmin(admin.ModelAdmin):
    pass

class VehicleModelVOAdmin(admin.ModelAdmin):
    pass


admin.site.register(AutomobileVO, AutomobileVOAdmin)
admin.site.register(ManufacturerVO, ManufacturerVOAdmin)
admin.site.register(VehicleModelVO, VehicleModelVOAdmin)
