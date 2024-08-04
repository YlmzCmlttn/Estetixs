from django.db import models
from users.models import User,Doctor, Patient
from django.core.exceptions import ValidationError

class Service_Type(models.Model):
    name = models.CharField(max_length=100)
    description = models.TextField()

    def __str__(self):
        return self.name
    

class Service(models.Model):
    class Status(models.TextChoices):
        PENDING = "PENDING", "Pending"
        CONFIRMED = "CONFIRMED", "Confirmed"
        CANCELLED = "CANCELLED", "Cancelled"
        COMPLETED = "COMPLETED", "Completed"
        
    doctor = models.ForeignKey(Doctor, on_delete=models.CASCADE, related_name='doctor_services')
    patient = models.ForeignKey(Patient, on_delete=models.CASCADE, related_name='patient_services')
    type = models.ForeignKey(Service_Type, on_delete=models.CASCADE)
    status = models.CharField(max_length=10, choices=Status.choices, default=Status.PENDING)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def clean(self):
        doctor_service_types = Doctor_Service_Type.objects.filter(doctor=self.doctor, service_type=self.type)
        if not doctor_service_types.exists():
            raise ValidationError({'type': f'The doctor does not have the service type {self.type.name}.'})

    def __str__(self):
        return f'{self.doctor} - {self.patient} - {self.type} - {self.id}'
class Operation_Type(models.Model):
    name = models.CharField(max_length=100)
    description = models.TextField()
    service_type = models.ForeignKey(Service_Type, on_delete=models.CASCADE)

    def __str__(self):
        return self.name + ' - ' + self.service_type.name
    
class Service_Operation(models.Model):
    service = models.ForeignKey(Service, on_delete=models.CASCADE)
    operation = models.ForeignKey(Operation_Type, on_delete=models.CASCADE)

    def clean(self):
        operation_service_type = Operation_Type.objects.get(pk=self.operation.pk).service_type
        if operation_service_type != self.service.type:
            raise ValidationError({'operation': f'The operation type {self.operation.name} does not match the service type {self.service.type.name}.'})        


class Doctor_Service_Type(models.Model):
    doctor = models.ForeignKey(Doctor, on_delete=models.CASCADE)
    service_type = models.ForeignKey(Service_Type, on_delete=models.CASCADE)

    def clean(self):
        doctor_service_types = Doctor_Service_Type.objects.filter(doctor=self.doctor)
        if doctor_service_types.filter(service_type=self.service_type).exists():
            raise ValidationError({'service_type': f'The doctor already has the service type {self.service_type.name}.'})
    
class Doctor_Operation_Type(models.Model):
    doctor = models.ForeignKey(Doctor, on_delete=models.CASCADE)
    operation_type = models.ForeignKey(Operation_Type, on_delete=models.CASCADE)

    def clean(self):
        operation_service_type = self.operation_type.service_type
        doctor_service_types = Doctor_Service_Type.objects.filter(doctor=self.doctor, service_type=operation_service_type)
        if not doctor_service_types.exists():
            raise ValidationError({'operation_type': f'The doctor does not have the service type {operation_service_type.name} required for this operation type.'})



class Appointment(models.Model):
    STATUS_CHOICES = (
        ('pending', 'Pending'),
        ('confirmed', 'Confirmed'),
        ('offered', 'Offered'),
        ('rescheduled', 'Rescheduled'),
        ('completed', 'Completed'),
        ('cancelled', 'Cancelled'),
    )
    APPOINTMENT_TYPE = (
        ('on-site', 'On-Site'),
        ('online', 'Online')
    )
    
    service = models.ForeignKey(Service, on_delete=models.CASCADE)
    status = models.CharField(max_length=11, choices=STATUS_CHOICES, default='pending')
    type = models.CharField(max_length=10, choices=APPOINTMENT_TYPE, default='on-site')
    date_and_time = models.DateTimeField()
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    def __str__(self):
        return f'Appointment{self.id} - Service {self.service.id}'

class AppointmentHistory(models.Model):
    appointment = models.ForeignKey(Appointment, related_name='history', on_delete=models.CASCADE)
    new_date = models.DateTimeField()
    previous_date = models.DateTimeField()
    changed_by = models.ForeignKey(User, on_delete=models.CASCADE)
    changed_at = models.DateTimeField(auto_now_add=True)
    comment = models.TextField(null=True, blank=True)
    def __str__(self):
        return f'Appointment {self.appointment.id}'