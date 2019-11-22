from django.shortcuts import render
from rest_framework.generics import ListCreateAPIView
from .models import Wish
from .serializers import WishSerializer


class WishesIndex(ListCreateAPIView):
    queryset = Wish.objects.all()
    serializer_class = WishSerializer

# Create your views here.
