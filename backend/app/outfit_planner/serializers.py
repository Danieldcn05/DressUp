from rest_framework import serializers
from .models import OutfitPlanner


class OutfitPlannerSerializer(serializers.ModelSerializer):
    class Meta:
        model = OutfitPlanner
        fields = "__all__"
