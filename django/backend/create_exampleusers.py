import os
import django
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'api.settings')
django.setup()
from django.contrib.auth import get_user_model
from users.models import Doctor, Patient


User = get_user_model()
# Create Doctor Superuser
if not User.objects.filter(email='doctor@example.com').exists():
    doctor = Doctor.objects.create_user(
        email='doctor@example.com',
        password='sananesanane',
        is_staff=False,
        is_superuser=False,
    )    
    doctor.save()
    print('Doctor created.')
else:
    print('Doctor already exists.')

# Create Patient Superuser
if not User.objects.filter(email='patient@example.com').exists():
    patient = Patient.objects.create_user(
        email='patient@example.com',
        password='sananesanane',
        is_staff=False,
        is_superuser=False,
    )
    patient.save()
    print('Patient created.')
else:
    print('Patient already exists.')


