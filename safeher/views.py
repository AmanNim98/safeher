from django.views.decorators.csrf import csrf_exempt
from django.http import Http404
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.contrib.gis.geos import Point
from django.contrib.gis.db.models.functions import Distance
from geomanager.models import *
import random

class HexCentres(APIView):
    """
        List all hexbin centres
    """
    @csrf_exempt
    def dispatch(self, *args, **kwargs):
        return super(HexCentres, self).dispatch(*args, **kwargs)

    def get_heat(self, hexagon):
        incidents = hexagon.incident_set.all();
        heat = 0
        total = 0
        for incident in incidents:
            heat += int(incident.category)
            total += 1
        if heat:
            print(heat, hexagon.centre)
        return heat // total if total else 0

    def get(self, request, format=None):
        max_heat = 7
        hexagons = Hexagon.objects.all().prefetch_related('incident_set')
        data = [{"centre": hexagon.centre.coords, "heat": self.get_heat(hexagon)} for hexagon in hexagons]
        data.append({"centre": [-70, -70], "heat": max_heat})
        return Response(data)

    # def post(self, request, format=None):
    #     Hexagon.objects.all().delete()
    #     hexagons = []
    #     for point in request.data['data1']:
    #         hexagons.append(Hexagon(centre=Point(point[0], point[1])))
    #     Hexagon.objects.bulk_create(hexagons)
    #     return Response({"status": "OK"})

class ReportCrime(APIView):
    """
        Report a crime view for a user
    """
    def post(self, request, *args, **kwargs):
        data = request.data
        location = Point(data['longitude'], data['latitude'], srid=4326)
        hexagon = Hexagon.objects.annotate(distance=Distance('centre', location)).order_by('distance')[0];
        print(hexagon.distance)
        Incident.objects.create(time=data['time'], date=data['date'], location=location, category=data['category'], description=data['description'], hexagon=hexagon)
        return Response({"status": "OK"})

class CrimeAtPointView(APIView):
    def post(self, request, *args, **kwargs):
        print(request.data)
        return Response({ "magnitude": 5 })

