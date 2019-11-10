from django.contrib import admin
from .models import Rover_Base_Station, Gps

class Rover_Base_Station_Admin(admin.ModelAdmin): 
    list_display = ('title', 'description', 'completed')

class GpsAdmin(admin.ModelAdmin):
    list_display = ('date', 'time', 'longitude', 'latitude', 'altitude')

# Register your models here.
admin.site.register(Rover_Base_Station, Rover_Base_Station_Admin)
admin.site.register(Gps, GpsAdmin)