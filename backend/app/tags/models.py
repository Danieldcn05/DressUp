from django.db import models
from user.models import CustomUser

# Create your models here.


class Tags(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=100)
    color = models.CharField(max_length=100)
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    isActive = models.BooleanField(default=True)
