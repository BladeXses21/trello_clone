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
    card_id = serializers.IntegerField()
    list_id = serializers.IntegerField()

    class Meta:
        model = CardListModel
        fields = '__all__'

    def create(self, validated_data):
        card_data = validated_data.pop('card')
        card = TrelloCardModel.objects.create(**card_data)
        instance, created = self.Meta.model.objects.update_or_create(card=card, list_id=validated_data['list_id'], defaults=validated_data)
        return instance
