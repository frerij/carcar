from django.contrib import admin

from .models import AutomobileVO, ManufacturerVO, VehicleModelVO, Sale

class AutomobileVOAdmin(admin.ModelAdmin):
    pass

class ManufacturerVOAdmin(admin.ModelAdmin):
    pass

class VehicleModelVOAdmin(admin.ModelAdmin):
    pass

class SaleAdmin(admin.ModelAdmin):
    pass


admin.site.register(AutomobileVO, AutomobileVOAdmin)
admin.site.register(ManufacturerVO, ManufacturerVOAdmin)
admin.site.register(VehicleModelVO, VehicleModelVOAdmin)
admin.site.register(Sale, SaleAdmin)
