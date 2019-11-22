from django.urls import path
from .views import WishesIndex

urlpatterns = [
    path('wishes', WishesIndex.as_view())
]
