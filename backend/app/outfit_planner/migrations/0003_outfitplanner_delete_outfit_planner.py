# Generated by Django 4.2 on 2025-01-28 18:52

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('outfit', '0002_remove_outfit_garments_remove_outfit_tags_and_more'),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('outfit_planner', '0002_alter_outfit_planner_outfit_and_more'),
    ]

    operations = [
        migrations.CreateModel(
            name='OutfitPlanner',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('date', models.DateField()),
                ('outfit', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='outfit.outfit')),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.DeleteModel(
            name='Outfit_planner',
        ),
    ]
