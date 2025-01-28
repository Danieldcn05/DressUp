from rest_framework import serializers
from .models import Outfit_planner


class Outfit_plannerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Outfit_planner
        fields = "__all__"
