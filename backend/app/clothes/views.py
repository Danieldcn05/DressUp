from django.shortcuts import render
from rest_framework import generics
from .models import Clothes
from .serializers import ClothesSerializer
from rest_framework.permissions import IsAuthenticated
from user.mixins import idUserFilterMixin


class ClothesList(idUserFilterMixin, generics.ListCreateAPIView):
    queryset = Clothes.objects.all()
    serializer_class = ClothesSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        queryset = super().get_queryset()
        queryset = self.filter_by_id_user(queryset)
        return queryset


class ClothesDetail(idUserFilterMixin, generics.RetrieveUpdateDestroyAPIView):
    queryset = Clothes.objects.all()
    serializer_class = ClothesSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        queryset = super().get_queryset()
        queryset = self.filter_by_id_user(queryset)
        return queryset
