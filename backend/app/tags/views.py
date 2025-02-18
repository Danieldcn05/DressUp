from django.shortcuts import render
from rest_framework import generics, status
from rest_framework.response import Response
from .models import Tags
from .serializers import TagsSerializer
from rest_framework.permissions import IsAuthenticated
from user.mixins import idUserFilterMixin

# Create your views here.


class TagsList(idUserFilterMixin, generics.ListCreateAPIView):
   #permission_classes = [IsAuthenticated]
    queryset = Tags.objects.all()
    serializer_class = TagsSerializer

    def get_queryset(self):
        queryset = super().get_queryset()
        return self.filter_by_id_user(queryset)


class TagsDetail(idUserFilterMixin, generics.RetrieveUpdateDestroyAPIView):
    permission_classes = [IsAuthenticated]
    queryset = Tags.objects.all()
    serializer_class = TagsSerializer

    def get_queryset(self):
        queryset = super().get_queryset()
        return self.filter_by_id_user(queryset)


class CreateTagView(generics.CreateAPIView):
    queryset = Tags.objects.all()
    serializer_class = TagsSerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save()
        return Response(
            {
                "response": "Tag created successfully",
            },
            status=status.HTTP_201_CREATED,
        )


class DeleteTagView(generics.DestroyAPIView):
    queryset = Tags.objects.all()
    serializer_class = TagsSerializer
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
                "response": "Tag deleted successfully",
            },
            status=status.HTTP_204_NO_CONTENT,
        )
