from django.db import models
from django.contrib.postgres.fields import ArrayField
from user.models import CustomUser
from tags.models import Tags
from clothes.models import Clothes

# Create your models here.


class Outfit(models.Model):
    id = models.AutoField(primary_key=True)
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    Garments = models.ManyToManyField(Clothes, blank=True)  # Cambia a ManyToManyField
    tags = models.ManyToManyField(Tags, blank=True)
    img = models.ImageField(upload_to="outfit")
    isActive = models.BooleanField(default=True)
