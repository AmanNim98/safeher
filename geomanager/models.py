from django.contrib.gis.db import models

class Hexagon(models.Model):
	centre = models.PointField(null=False)
	heat = models.IntegerField(default=0)

class Incident(models.Model):
	hexagon = models.ForeignKey(Hexagon, null=False, on_delete=models.DO_NOTHING)
	category = models.IntegerField(null=True)
	date = models.DateField(null=True)
	time = models.TimeField(null=True)
	location = models.PointField(null=True)
	description = models.CharField(max_length=200)

