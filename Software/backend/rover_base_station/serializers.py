from rest_framework import serializers
from .models import Gps, AccGyro, Battery, Lidar, Video

# Specifies the GPS model to work with and the fields we want to be converted to JSON.
class GpsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Gps
        fields = ('date', 'time', 'longitude', 'latitude', 'altitude')

# Specifies the AccGyro model to work with and the fields we want to be converted to JSON.
class AccGyroSerializer(serializers.ModelSerializer):
    class Meta:
        model = AccGyro
        fields = ('date', 'time', 'accX', 'accY', 'accZ', 'gyroX', 'gyroY', 'gyroZ')

# Specifies the Battery model to work with and the fields we want to be converted to JSON.
class BatterySerializer(serializers.ModelSerializer):
    class Meta:
        model = Battery
        fields = ('date', 'time', 'voltage', 'amperage')

# Specifies the Lidarmodel to work with and the fields we want to be converted to JSON.
class LidarSerializer(serializers.ModelSerializer):
    class Meta:
        model = Lidar
        fields = ('date', 'time', 'img')

# Specifies the Video model to work with and the fields we want to be converted to JSON.
class VideoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Video
        fields = ('date', 'time', 'img')