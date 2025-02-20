from django.db.models.signals import post_save
from django.dispatch import receiver
from django.contrib.auth.models import User
from tags.models import Tags
from .models import CustomUser
from tags.default_tags import DEFAULT_TAGS


@receiver(post_save, sender=CustomUser)
def create_default_tags(sender, instance, created, **kwargs):
    if created:
        for tag_data in DEFAULT_TAGS:
            Tags.objects.create(user=instance, **tag_data)
