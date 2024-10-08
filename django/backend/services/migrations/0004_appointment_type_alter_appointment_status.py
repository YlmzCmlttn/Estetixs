# Generated by Django 4.2.14 on 2024-08-03 17:49

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('services', '0003_alter_appointment_status_appointmenthistory'),
    ]

    operations = [
        migrations.AddField(
            model_name='appointment',
            name='type',
            field=models.CharField(choices=[('on-site', 'On-Site'), ('online', 'Online')], default='on-site', max_length=10),
        ),
        migrations.AlterField(
            model_name='appointment',
            name='status',
            field=models.CharField(choices=[('pending', 'Pending'), ('confirmed', 'Confirmed'), ('offered', 'Offered'), ('rescheduled', 'Rescheduled'), ('completed', 'Completed'), ('cancelled', 'Cancelled')], default='pending', max_length=11),
        ),
    ]
