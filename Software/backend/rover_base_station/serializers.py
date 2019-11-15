from rest_framework import serializers
from .models import Rover_Base_Station, Gps, AccGyro, Battery

# Specifies the model to work with and the fields we want to be converted to JSON.
class Rover_Base_Station_Serializer(serializers.ModelSerializer):
    class Meta:
        model = Rover_Base_Station
        fields = ('id', 'title', 'description', 'completed')

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