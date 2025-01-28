from django.shortcuts import render
from rest_framework import generics, status
from rest_framework.response import Response
from .models import Outfit_planner
from .serializers import Outfit_plannerSerializer
from rest_framework.permissions import IsAuthenticated
from user.mixins import idUserFilterMixin


class Outfit_plannerList(idUserFilterMixin, generics.ListCreateAPIView):
    permission_classes = [IsAuthenticated]
    queryset = Outfit_planner.objects.all()
    serializer_class = Outfit_plannerSerializer

    def get_queryset(self):
        queryset = super().get_queryset()
        return self.filter_by_id_user(queryset)


class Outfit_plannerDetail(idUserFilterMixin, generics.RetrieveUpdateDestroyAPIView):
    permission_classes = [IsAuthenticated]
    queryset = Outfit_planner.objects.all()
    serializer_class = Outfit_plannerSerializer

    def get_queryset(self):
        queryset = super().get_queryset()
        return self.filter_by_id_user(queryset)


class CreateOutfit_plannerView(generics.CreateAPIView):
    queryset = Outfit_planner.objects.all()
    serializer_class = Outfit_plannerSerializer

    def perform_create(self, serializer):
        serializer.save()
        return Response(
            {
                "response": "Outfit_planner created successfully",
            },
            status=status.HTTP_201_CREATED,
        )
