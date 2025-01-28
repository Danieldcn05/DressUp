from django.db import models
from django.contrib.postgres.fields import ArrayField
from user.models import User
from tags.models import Tags


class Clothes(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=100)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    tags = models.ManyToManyField(Tags, blank=True)
    img = models.ImageField(upload_to="clothes")
    isActive = models.BooleanField(default=True)
