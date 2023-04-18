from rest_framework import generics, status
from rest_framework.decorators import api_view
from rest_framework.generics import UpdateAPIView
from rest_framework.parsers import JSONParser
from rest_framework.response import Response
from rest_framework.views import APIView

from .models import TrelloListModel
from .serializers import TrelloCardSerializer, TrelloListSerializer


class TrelloListView(generics.ListAPIView):
    queryset = TrelloListModel.objects.all()
    serializer_class = TrelloListSerializer

    def list(self, request, *args, **kwargs):
        queryset = self.filter_queryset(self.get_queryset())
        serializer = self.get_serializer(queryset, many=True)
        data = serializer.data
        for item in data:
            item['cards'] = TrelloCardSerializer(item['cards'], many=True).data
        return Response(data)


@api_view(['PUT'])
def update_lists(request):
    lists = request.data.get('lists')
    serializer = TrelloListSerializer(data=lists, many=True)
    serializer.is_valid(raise_exception=True)
    serializer.save()

    return Response(serializer.data)
