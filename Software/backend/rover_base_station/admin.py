from django.contrib import admin
from .models import Rover_Base_Station, Gps, AccGyro, Battery, Video

# Create classes to represent the admin models
class Rover_Base_Station_Admin(admin.ModelAdmin): 
    list_display = ('title', 'description', 'completed')

class GpsAdmin(admin.ModelAdmin):
    list_display = ('date', 'time', 'longitude', 'latitude', 'altitude')

class AccGyroAdmin(admin.ModelAdmin):
    list_display = ('date', 'time', 'accX', 'accY', 'accZ', 'gyroX', 'gyroY', 'gyroZ')

class BatteryAdmin(admin.ModelAdmin):
    list_display = ('date', 'time', 'voltage', 'amperage')

class VideoView(admin.ModelAdmin):
    list_display = ('date', 'time', 'img')


# Register the models
admin.site.register(Rover_Base_Station, Rover_Base_Station_Admin)
admin.site.register(Gps, GpsAdmin)
admin.site.register(AccGyro, AccGyroAdmin)
admin.site.register(Battery, BatteryAdmin)
admin.site.register(Video, VideoView)