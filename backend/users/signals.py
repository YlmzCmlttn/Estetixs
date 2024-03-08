
from django.db.models.signals import post_save
from django.dispatch import receiver
from rest_framework.authtoken.models import Token
from .models import User, Patient, Doctor
from profiles.models import UserProfile, PatientProfile, DoctorProfile

def create_user_(instance):
    UserProfile.objects.create(user=instance)
    Token.objects.create(user=instance)

@receiver(post_save, sender=User)
def create_user(sender, instance, created, **kwargs):    
    if created:
        create_user_(instance)


@receiver(post_save, sender=Patient)
def create_patient(sender, instance, created, **kwargs):    
    if created:
        create_user_(instance)
        PatientProfile.objects.create(user=instance)    


@receiver(post_save, sender=Doctor)
def create_doctor(sender, instance, created, **kwargs):    
    if created:
        create_user_(instance)
        DoctorProfile.objects.create(user=instance)