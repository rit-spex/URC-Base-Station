from django.shortcuts import render
from rest_framework import viewsets 
from .serializers import Rover_Base_Station_Serializer, GpsSerializer
from .models import Rover_Base_Station, Gps

class Rover_Base_Station_View(viewsets.ModelViewSet):
    serializer_class = Rover_Base_Station_Serializer 
    queryset = Rover_Base_Station.objects.all()

class GpsView(viewsets.ModelViewSet):
    serializer_class = GpsSerializer 
    queryset = Gps.objects.all()