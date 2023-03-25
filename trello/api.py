from rest_framework import generics, status
from rest_framework.response import Response

from .models import TrelloCardModel, TrelloListModel
from .serializers import TrelloCardSerializer, TrelloListSerializer


class TrelloCardCreateView(generics.CreateAPIView):
    queryset = TrelloCardModel.objects.all()
    serializer_class = TrelloCardSerializer

    def create(self, request, *args, **kwargs):
        list_id = request.data.get('list_id')
        try:
            trello_list = TrelloListModel.objects.get(id=list_id)
        except TrelloListModel.DoesNotExist:
            return Response({'error': 'TrelloList does not exist'}, status=status.HTTP_400_BAD_REQUEST)

        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.create(validated_data=serializer.validated_data, trello_list=trello_list)
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)


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
