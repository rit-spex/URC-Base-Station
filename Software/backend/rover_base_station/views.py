from rest_framework.parsers import FileUploadParser
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status

from django.shortcuts import render
from rest_framework import viewsets 
from .serializers import Rover_Base_Station_Serializer, GpsSerializer, AccGyroSerializer, BatterySerializer, VideoSerializer
from .models import Rover_Base_Station, Gps, AccGyro, Battery, Video

class Rover_Base_Station_View(viewsets.ModelViewSet):
    serializer_class = Rover_Base_Station_Serializer 
    queryset = Rover_Base_Station.objects.all()

class GpsView(viewsets.ModelViewSet):
    serializer_class = GpsSerializer 
    queryset = Gps.objects.all()

class AccGyroView(viewsets.ModelViewSet):
    serializer_class = AccGyroSerializer 
    queryset = AccGyro.objects.all()

class BatteryView(viewsets.ModelViewSet):
    serializer_class = BatterySerializer 
    queryset = Battery.objects.all()

class VideoView(viewsets.ModelViewSet):
    serializer_class = VideoSerializer
    queryset = Video.objects.all()

"""
class FileUploadView(APIView):
    parser_class = (FileUploadParser,)

    def post(self, request, *args, **kwargs):

      file_serializer = FileSerializer(data=request.data)

      if file_serializer.is_valid():
          file_serializer.save()
          return Response(file_serializer.data, status=status.HTTP_201_CREATED)
      else:
          return Response(file_serializer.errors, status=status.HTTP_400_BAD_REQUEST)
"""