from django.http import Http404
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

class HexCentres(APIView):
    """
    	List all hexbin centres
    """
    # def get(self, request, format=None):
    #     snippets = Snippet.objects.all()
    #     serializer = SnippetSerializer(snippets, many=True)
    #     return Response(serializer.data)

    def post(self, request, format=None):
        print(request.data);