# Generated by Django 5.0.7 on 2024-08-06 06:45

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('myapp', '0003_leaveapplication_delete_studentleave'),
    ]

    operations = [
        migrations.AlterField(
            model_name='leaveapplication',
            name='applicant_type',
            field=models.CharField(max_length=10),
        ),
    ]
