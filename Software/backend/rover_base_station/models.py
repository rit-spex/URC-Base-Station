from django.db import models

# Create your models here.

class Rover_Base_Station(models.Model):
    title = models.CharField(max_length=120)
    description = models.TextField()
    completed = models.BooleanField(default=False)

    def _str_(self):
        return self.title

# Models GPS data
class Gps(models.Model):
    date = models.DateField(auto_now_add=True, blank=True)
    time = models.TimeField(auto_now_add=True, blank=True)
    longitude = models.FloatField()
    latitude = models.FloatField()
    altitude = models.FloatField()

    def _str_(self):
        return "lon: " + str(self.longitude) + " lat: " + str(self.latitude) + " alt: " + str(self.altitude) + " timestamp: " + str(self.date) + " " + str (self.time)