from django.shortcuts import render
from rest_framework import generics
from .models import Outfit
from .serializers import OutfitSerializer
from rest_framework.permissions import IsAuthenticated
