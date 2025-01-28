from rest_framework.permissions import serializers
from .models import Outfit


class OutfitSerializer(serializers.ModelSerializer):
    class Meta:
        model = Outfit
        fields = "__all__"
