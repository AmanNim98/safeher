from django.contrib.gis.db import models

class Hexagon(models.Model):
	centre = models.PointField(null=False)

class Incident(models.Model):
	hexagon = models.ForeignKey(Hexagon, null=False, on_delete=models.DO_NOTHING)
	category = models.IntegerField(null=False)

