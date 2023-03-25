from django.urls import path, include
from rest_framework import routers
from .views import CardListSet, TrelloListSet, TrelloCardSet

router = routers.DefaultRouter()
router.register('lists', TrelloListSet)
router.register('cards', TrelloCardSet)
router.register('card-lists', CardListSet)

urlpatterns = [
    path('', include(router.urls)),
]