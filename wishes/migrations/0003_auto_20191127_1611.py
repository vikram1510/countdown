# Generated by Django 2.2.7 on 2019-11-27 16:11

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('wishes', '0002_wish_is_sent'),
    ]

    operations = [
        migrations.AlterField(
            model_name='wish',
            name='id',
            field=models.IntegerField(primary_key=True, serialize=False, unique=True),
        ),
    ]
