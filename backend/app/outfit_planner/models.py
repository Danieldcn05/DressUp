from django.db import models
from outfit.models import Outfit
from user.models import CustomUser


# Create your models here.
class OutfitPlanner(models.Model):
    id = models.AutoField(primary_key=True)
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    date = models.DateField()
    outfit = models.ForeignKey(Outfit, on_delete=models.CASCADE)  # Cambia a ForeignKey
