# Generated by Django 2.2.7 on 2019-11-27 15:59

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('wishes', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='wish',
            name='is_sent',
            field=models.BooleanField(default=False),
        ),
    ]
