from rest_framework import serializers
from .models import TrelloCardModel, TrelloListModel, CardListModel


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
        for card_data in cards_data:
            TrelloCardModel.objects.create(list=instance, **card_data)
        return instance


class CardListSerializer(serializers.ModelSerializer):
    card = TrelloCardSerializer()
    list = TrelloListSerializer()

    class Meta:
        model = CardListModel
        fields = '__all__'
