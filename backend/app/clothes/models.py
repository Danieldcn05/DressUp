from django.db import models
from user.models import CustomUser
from tags.models import Tags
from rembg import remove
from PIL import Image
import os


class Clothes(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=100)
    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    tags = models.ManyToManyField(Tags, blank=True)
    img = models.ImageField(upload_to="media/clothes")
    isActive = models.BooleanField(default=True)

    def save(self, *args, **kwargs):
        super().save(*args, **kwargs)
        if self.img:
            input_path = self.img.path
            output_path = os.path.splitext(input_path)[0] + "_no_bg.png"

            input_image = Image.open(input_path)
            output_image = remove(input_image)
            output_image.save(output_path)

            self.img = os.path.join("media/clothes", os.path.basename(output_path))
            os.remove(input_path)
            super().save(update_fields=["img"])
