# Generated by Django 4.2 on 2025-01-28 16:58

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('tags', '0001_initial'),
        ('user', '0001_initial'),
        ('clothes', '0001_initial'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='clothes',
            name='tags',
        ),
        migrations.AlterField(
            model_name='clothes',
            name='user',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='user.user'),
        ),
        migrations.AddField(
            model_name='clothes',
            name='tags',
            field=models.ManyToManyField(blank=True, to='tags.tags'),
        ),
    ]
