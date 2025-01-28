from django.shortcuts import render
from rest_framework import generics, status
from rest_framework.response import Response
from .models import OutfitPlanner
from .serializers import OutfitPlannerSerializer
from rest_framework.permissions import IsAuthenticated
from user.mixins import idUserFilterMixin


class OutfitPlannerList(idUserFilterMixin, generics.ListCreateAPIView):
    permission_classes = [IsAuthenticated]
    queryset = OutfitPlanner.objects.all()
    serializer_class = OutfitPlannerSerializer

    def get_queryset(self):
        queryset = super().get_queryset()
        return self.filter_by_id_user(queryset)


class OutfitPlannerDetail(idUserFilterMixin, generics.RetrieveUpdateDestroyAPIView):
    permission_classes = [IsAuthenticated]
    queryset = OutfitPlanner.objects.all()
    serializer_class = OutfitPlannerSerializer

    def get_queryset(self):
        queryset = super().get_queryset()
        return self.filter_by_id_user(queryset)


class CreateOutfitPlannerView(generics.CreateAPIView):
    queryset = OutfitPlanner.objects.all()
    serializer_class = OutfitPlannerSerializer

    def perform_create(self, serializer):
        serializer.save()
        return Response(
            {
                "response": "OutfitPlanner created successfully",
            },
            status=status.HTTP_201_CREATED,
        )


class DeleteOutfitPlannerView(generics.DestroyAPIView):
    queryset = OutfitPlanner.objects.all()
    serializer_class = OutfitPlannerSerializer
    permission_classes = [IsAuthenticated]
    lookup_field = "pk"

    def get_object(self):
        queryset = self.get_queryset()
        obj = queryset.get(pk=self.kwargs["pk"])
        return obj

    def perform_destroy(self, instance):
        instance.delete()
        return Response(
            {
                "response": "OutfitPlanner deleted successfully",
            },
            status=status.HTTP_204_NO_CONTENT,
        )
