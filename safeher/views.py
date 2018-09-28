from django.views.decorators.csrf import csrf_exempt
from django.http import Http404
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.contrib.gis.geos import Point
from geomanager.models import *

class HexCentres(APIView):
    """
        List all hexbin centres
    """
    @csrf_exempt
    def dispatch(self, *args, **kwargs):
        return super(HexCentres, self).dispatch(*args, **kwargs)

    def get(self, request, format=None):
        hexagons = Hexagon.objects.all()
        data = [{"centre": hexagon.centre.coords, "heat": 5} for hexagon in hexagons]
        return Response(data)

    def post(self, request, format=None):
        Hexagon.objects.all().delete()
        hexagons = []
        for point in request.data['data1']:
            hexagons.append(Hexagon(centre=Point(point[0], point[1])))
        Hexagon.objects.bulk_create(hexagons)
        return Response({"status": "OK"})