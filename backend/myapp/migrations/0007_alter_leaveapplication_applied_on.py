# Generated by Django 5.0.7 on 2024-08-07 09:01

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('myapp', '0006_alter_leaveapplication_applied_on'),
    ]

    operations = [
        migrations.AlterField(
            model_name='leaveapplication',
            name='applied_on',
            field=models.DateField(default=datetime.datetime(2024, 8, 7, 9, 1, 15, 815536, tzinfo=datetime.timezone.utc)),
        ),
    ]
