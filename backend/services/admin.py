from django.contrib import admin
from django import forms

from .models import Service, Service_Type, Operation_Type, Service_Operation, Appointment, Doctor_Service_Type, Doctor_Operation_Type
from .inlines import OperationInline

@admin.register(Service_Type)
class Service_TypeAdmin(admin.ModelAdmin):
    model = Service_Type
    list_display = ['name', 'description']
    search_fields = ['name']

@admin.register(Operation_Type)
class Operation_TypeAdmin(admin.ModelAdmin):
    model = Operation_Type
    list_display = ['name', 'description','service_type']
    list_filter = ['service_type']
    search_fields = ['name']

@admin.register(Service)
class ServiceAdmin(admin.ModelAdmin):
    model = Service
    list_display = ['doctor', 'patient', 'type', 'status', 'created_at', 'updated_at']
    search_fields = ['doctor', 'patient']
    list_filter = ['status', 'type']
    readonly_fields = ['created_at', 'updated_at']

    inlines = [OperationInline]


@admin.register(Service_Operation)
class Service_OperationAdmin(admin.ModelAdmin):
    model = Service_Operation
    list_display = ['service', 'operation']
    search_fields = ['service', 'operation']

@admin.register(Appointment)
class AppointmentAdmin(admin.ModelAdmin):
    model = Appointment
    list_display = ['service', 'status', 'date_and_time', 'created_at', 'updated_at']
    search_fields = ['service', 'status']
    list_filter = ['status']    

@admin.register(Doctor_Service_Type)
class Doctor_Service_TypeAdmin(admin.ModelAdmin):
    model = Doctor_Service_Type
    list_display = ['doctor', 'service_type']
    search_fields = ['doctor', 'service_type']
    list_filter = ['doctor', 'service_type']

# class DoctorOperationTypeForm(forms.ModelForm):
#     class Meta:
#         model = Doctor_Operation_Type
#         fields = '__all__'

#     def clean(self):
#         return super().clean()

@admin.register(Doctor_Operation_Type)
class Doctor_Operation_TypeAdmin(admin.ModelAdmin):
    model = Doctor_Operation_Type
    list_display = ['doctor', 'operation_type']
    search_fields = ['doctor', 'operation_type']
    list_filter = ['doctor', 'operation_type']