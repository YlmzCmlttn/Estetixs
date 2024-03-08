from django.contrib import admin

from .models import UserProfile, PatientProfile, DoctorProfile


@admin.register(UserProfile)
class UserProfileAdmin(admin.ModelAdmin):
    model = UserProfile
    list_display = ['user', 'country', 'state', 'city', 'address', 'zip_code', 'phone', 'date_of_birth']
    search_fields = ['user__username']


@admin.register(PatientProfile)
class PatientProfileAdmin(admin.ModelAdmin):
    model = PatientProfile
    list_display = ['user', 'patient_id', 'created_at', 'updated_at']
    search_fields = ['user__username']

@admin.register(DoctorProfile)
class DoctorProfileAdmin(admin.ModelAdmin):
    model = DoctorProfile
    list_display = ['user', 'doctor_id', 'created_at', 'updated_at']
    search_fields = ['user__username']