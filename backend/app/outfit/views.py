from django.shortcuts import render
from rest_framework import generics, status
from rest_framework.response import Response
from .models import Outfit
from .serializers import OutfitSerializer
from rest_framework.permissions import IsAuthenticated
from user.mixins import idUserFilterMixin


class OutfitList(idUserFilterMixin, generics.ListCreateAPIView):
    queryset = Outfit.objects.all()
    serializer_class = OutfitSerializer
    #permission_classes = [IsAuthenticated]

    def get_queryset(self):
        queryset = super().get_queryset()
        #queryset = self.filter_by_id_user(queryset)
        return queryset


class OutfitDetail(idUserFilterMixin, generics.RetrieveUpdateDestroyAPIView):
    queryset = Outfit.objects.all()
    serializer_class = OutfitSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        queryset = super().get_queryset()
        queryset = self.filter_by_id_user(queryset)
        return queryset


class CreateOutfitView(idUserFilterMixin, generics.CreateAPIView):
    queryset = Outfit.objects.all()
    serializer_class = OutfitSerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


class UpdateOutfitView(idUserFilterMixin, generics.UpdateAPIView):
    queryset = Outfit.objects.all()
    serializer_class = OutfitSerializer
    permission_classes = [IsAuthenticated]
    lookup_field = "pk"

    def get_object(self):
        queryset = self.get_queryset()
        obj = queryset.get(pk=self.kwargs["pk"])
        return obj

    def perform_update(self, serializer):
        serializer.save(user=self.request.user)
        return Response(
            {
                "response": "Outfit updated successfully",
            },
            status=status.HTTP_200_OK,
        )


class DeleteOutfitView(idUserFilterMixin, generics.DestroyAPIView):
    queryset = Outfit.objects.all()
    serializer_class = OutfitSerializer
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
                "response": "Outfit deleted successfully",
            },
            status=status.HTTP_204_NO_CONTENT,
        )


# RANDOM
