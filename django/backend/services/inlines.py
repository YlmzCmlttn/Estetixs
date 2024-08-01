from django.contrib import admin

from .models import Service, Service_Type, Operation_Type, Service_Operation, Appointment, Doctor_Service_Type, Doctor_Operation_Type

class OperationInline(admin.StackedInline):
    model = Service_Operation
    can_delete = True
    verbose_name_plural = 'Operations'
    extra = 1