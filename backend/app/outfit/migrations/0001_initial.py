# Generated by Django 4.2 on 2025-02-05 15:20

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('clothes', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Outfit',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('img', models.ImageField(upload_to='outfit')),
                ('isActive', models.BooleanField(default=True)),
                ('Garments', models.ManyToManyField(blank=True, to='clothes.clothes')),
            ],
        ),
    ]
