from django.shortcuts import render
from rest_framework import generics
from .models import Clothes
from .serializers import ClothesSerializer
from rest_framework.permissions import IsAuthenticated
from user.mixins import idUserFilterMixin
from rest_framework.response import Response
from rest_framework import status


class ClothesList(idUserFilterMixin, generics.ListCreateAPIView):
    queryset = Clothes.objects.all()
    serializer_class = ClothesSerializer
    #permission_classes = [IsAuthenticated]

    def get_queryset(self):
        queryset = super().get_queryset()
        #queryset = self.filter_by_id_user(queryset)
        return queryset


class ClothesDetail(idUserFilterMixin, generics.RetrieveUpdateDestroyAPIView):
    queryset = Clothes.objects.all()
    serializer_class = ClothesSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        queryset = super().get_queryset()
        queryset = self.filter_by_id_user(queryset)
        return queryset


class CreateClothesView(idUserFilterMixin, generics.CreateAPIView):
    queryset = Clothes.objects.all()
    serializer_class = ClothesSerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


class UpdateClothesView(idUserFilterMixin, generics.UpdateAPIView):
    queryset = Clothes.objects.all()
    serializer_class = ClothesSerializer
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
                "response": "Clothes updated successfully",
            },
            status=status.HTTP_200_OK,
        )


class DeleteClothesView(idUserFilterMixin, generics.DestroyAPIView):
    queryset = Clothes.objects.all()
    serializer_class = ClothesSerializer
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
                "response": "Clothes deleted successfully",
            },
            status=status.HTTP_204_NO_CONTENT,
        )


class InactiveClothesView(idUserFilterMixin, generics.UpdateAPIView):
    queryset = Clothes.objects.all()
    serializer_class = ClothesSerializer
    permission_classes = [IsAuthenticated]
    lookup_field = "pk"

    def get_object(self):
        queryset = self.get_queryset()
        obj = queryset.get(pk=self.kwargs["pk"])
        return obj

    def perform_update(self, serializer):
        serializer.save(isActive=False)
        return Response(
            {
                "response": "Clothes inactivated successfully",
            },
            status=status.HTTP_200_OK,
        )


class InactiveClothesList(idUserFilterMixin, generics.ListAPIView):
    queryset = Clothes.objects.all()
    serializer_class = ClothesSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        queryset = super().get_queryset()
        queryset = self.filter_by_id_user(queryset)
        queryset = queryset.filter(isActive=False)
        return queryset
