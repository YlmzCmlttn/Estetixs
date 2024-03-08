from django.contrib import admin
from django.contrib.auth.admin import UserAdmin

from .models import User, Patient, Doctor
from .forms import CustomUserCreationForm, CustomUserChangeForm, PatientCreationForm, PatientChangeForm, DoctorCreationForm, DoctorChangeForm

from .inlines import UserProfileInline


@admin.register(User)
class CustomUserAdmin(UserAdmin):
    add_form = CustomUserCreationForm
    form = CustomUserChangeForm
    model = User
    list_display = ['email', 'username', 'role', 'is_staff']
    fieldsets = UserAdmin.fieldsets + (
        (None, {'fields': ('role',)}),  # Add your custom fields here
    )
    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ('email', 'role', 'password1', 'password2'),
        }),
    )
    inlines = [UserProfileInline]

@admin.register(Patient)
class PatientAdmin(UserAdmin):
    add_form = PatientCreationForm
    form = PatientChangeForm
    model = Patient
    fieldsets = UserAdmin.fieldsets
    
    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ('email', 'password1', 'password2'),
        }),
    )
    list_display = ['email', 'username']
    search_fields = ['username']

    inlines = [UserProfileInline]

@admin.register(Doctor)
class DoctorAdmin(UserAdmin):
    add_form = DoctorCreationForm
    form = DoctorChangeForm
    model = Doctor
    fieldsets = UserAdmin.fieldsets
    
    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ('email', 'password1', 'password2'),
        }),
    )
    list_display = ['email', 'username']
    search_fields = ['username']

    inlines = [UserProfileInline]
