from django.urls import path
from .views import WishesIndex, SendSMS

urlpatterns = [
    path('wishes', WishesIndex.as_view()),
    path('smses', SendSMS.as_view())
]
