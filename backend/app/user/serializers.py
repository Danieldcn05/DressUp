from rest_framework import serializers
from django.contrib.auth import get_user_model

User = get_user_model()


class UserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, required=True)
    picture = serializers.ImageField(required=False)

    class Meta:
        model = User
        fields = (
            "id",
            "email",
            "name",
            "picture",
            "password",
        )
        extra_kwargs = {
            "email": {"required": False},
            "password": {"write_only": True},
        }

    def create(self, validated_data):
        user = User.objects.create_user(
            email=validated_data["email"],
            password=validated_data["password"],
            name=validated_data.get("name", ""),
            picture=validated_data.get("picture", None),
        )
        return user

    def update(self, instance, validated_data):
        instance.email = validated_data.get("email", instance.email)
        instance.name = validated_data.get("name", instance.name)

        picture = validated_data.get("picture", None)
        if picture:
            instance.picture = picture

        password = validated_data.get("password", None)
        if password:
            instance.set_password(password)

        instance.save()
        return instance
