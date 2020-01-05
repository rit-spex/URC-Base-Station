from django.db import models

class Rover_Base_Station(models.Model):
    title = models.CharField(max_length=120)
    description = models.TextField()
    completed = models.BooleanField(default=False)

    def _str_(self):
        return self.title

# Model for the GPS data
class Gps(models.Model):
    date = models.DateField(auto_now_add=True, blank=True)
    time = models.TimeField(auto_now_add=True, blank=True)
    longitude = models.FloatField()
    latitude = models.FloatField()
    altitude = models.FloatField()

    def _str_(self):
        return "lon: " + str(self.longitude) + " lat: " + str(self.latitude) + " alt: " + str(self.altitude) + " timestamp: " + str(self.date) + " " + str (self.time)

# Model for the Accelorometer and Gyro data
class AccGyro(models.Model):
    date = models.DateField(auto_now_add=True, blank=True)
    time = models.TimeField(auto_now_add=True, blank=True)
    accX = models.FloatField()
    accY = models.FloatField()
    accZ = models.FloatField()
    gyroX = models.FloatField()
    gyroY = models.FloatField()
    gyroZ = models.FloatField()

    def _str_(self):
        return "accX: " + str(self.accX) + "accY: " + str(self.accY) + "accZ: " + str(self.accZ) + "gyroX: " + str(self.gyroX) + "gyroY: " + str(self.gyroY) + "gyroZ: " + str(self.gyroZ) +  " timestamp: " + str(self.date) + " " + str (self.time)

# Model for the Battery data
class Battery(models.Model):
    date = models.DateField(auto_now_add=True, blank=True)
    time = models.TimeField(auto_now_add=True, blank=True)
    voltage = models.FloatField()
    amperage = models.FloatField()

    def _str_(self):
        return "voltage: " + str(self.voltage) + " amperage: " + str(self.amperage) + " timestamp: " + str(self.date) + " " + str (self.time)


# Model for Video data
class Video(models.Model):
    date = models.DateField(auto_now_add=True, blank=True)
    time = models.TimeField(auto_now_add=True, blank=True)
    img = models.TextField(blank=True)
    #models.ImageField(upload_to=None, height_field=None, width_field=None, max_length=100)

    def _str_(self):
        return "video timestamp: " + str(self.date) + " " + str (self.time)
