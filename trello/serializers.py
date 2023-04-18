from rest_framework import serializers
from .models import TrelloCardModel, TrelloListModel


class TrelloCardSerializer(serializers.ModelSerializer):
    class Meta:
        model = TrelloCardModel
        fields = '__all__'


class TrelloListSerializer(serializers.ModelSerializer):
    cards = TrelloCardSerializer(many=True, read_only=True)

    class Meta:
        model = TrelloListModel
        fields = ['id', 'title', 'cards']

    def create(self, validated_data):
        cards_data = validated_data.pop('cards', [])
        instance = self.Meta.model.objects.create(**validated_data)
        for i, card_data in enumerate(cards_data):
            TrelloCardModel.objects.create(list=instance, position=i, **card_data)
        return instance
