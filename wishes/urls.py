from django.urls import path
from .views import WishesIndex, WishesDetail, SendSMS, SendAllSMS

urlpatterns = [
    path('wishes', WishesIndex.as_view()),
    path('wishes/<int:pk>', WishesDetail.as_view()),
    path('smses', SendSMS.as_view()),
    path('sendall', SendAllSMS.as_view()),
]
