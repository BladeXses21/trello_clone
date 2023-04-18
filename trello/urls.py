from django.urls import path, include
from rest_framework import routers
from .views import TrelloListSet, TrelloCardSet

router = routers.DefaultRouter()
router.register('api/lists', TrelloListSet)
router.register('api/cards', TrelloCardSet)

urlpatterns = [
    path('', include(router.urls)),
]