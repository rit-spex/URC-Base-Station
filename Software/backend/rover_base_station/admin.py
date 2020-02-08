from django.contrib import admin
from .models import Gps, AccGyro, Battery, Lidar, Video

class GpsAdmin(admin.ModelAdmin):
    list_display = ('date', 'time', 'longitude', 'latitude', 'altitude')

class AccGyroAdmin(admin.ModelAdmin):
    list_display = ('date', 'time', 'accX', 'accY', 'accZ', 'gyroX', 'gyroY', 'gyroZ')

class BatteryAdmin(admin.ModelAdmin):
    list_display = ('date', 'time', 'voltage', 'amperage')

class LidarAdmin(admin.ModelAdmin):
    list_display = ('date', 'time', 'img')

class VideoView(admin.ModelAdmin):
    list_display = ('date', 'time', 'img')

# Register the models
admin.site.register(Gps, GpsAdmin)
admin.site.register(AccGyro, AccGyroAdmin)
admin.site.register(Battery, BatteryAdmin)
admin.site.register(Lidar, LidarAdmin)
admin.site.register(Video, VideoView)