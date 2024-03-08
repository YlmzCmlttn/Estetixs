from django.core.exceptions import ValidationError as DjangoValidationError
from rest_framework.exceptions import ValidationError as DRFValidationError
from rest_framework import serializers

from .models import Service, Doctor_Service_Type, Doctor_Operation_Type, Appointment, Service_Operation

class CustomModelSerializer(serializers.ModelSerializer):
    def validate(self, data):
        instance = self.Meta.model(**data)
        try:
            instance.clean()
        except DjangoValidationError as e:
            raise DRFValidationError(e.message_dict)
        return super().validate(data)

class ServiceCreateSerializer(CustomModelSerializer):
    class Meta:
        model = Service
        fields = 'doctor', 'type',
        
class ServiceSerializer(serializers.ModelSerializer):
    doctor_username = serializers.CharField(source='doctor.username', read_only=True)
    patient_username = serializers.CharField(source='patient.username', read_only=True)
    type_name = serializers.CharField(source='type.name', read_only=True)
    class Meta:
        model = Service
        fields = '__all__'
        read_only_fields = 'doctor', 'patient','type', 'created_at', 'updated_at'

class Doctor_Service_TypeSerializer(CustomModelSerializer):
    service_type_name = serializers.CharField(source='service_type.name', read_only=True)
    class Meta:
        model = Doctor_Service_Type
        fields = '__all__'
        read_only_fields = 'id','doctor'

    def validate(self, data):
        doctor = self.context['request'].user
        if doctor.is_doctor:
            data['doctor'] = doctor
        return super().validate(data)
    
class Doctor_Operation_TypeSerializer(CustomModelSerializer):
    operation_type_name = serializers.CharField(source='operation_type.name', read_only=True)
    class Meta:
        model = Doctor_Operation_Type
        fields = '__all__'
        read_only_fields = 'id','doctor'
    
    def validate(self, data):
        doctor = self.context['request'].user
        if doctor.is_doctor:
            data['doctor'] = doctor
        return super().validate(data)
    
class Service_OperationSerializer(CustomModelSerializer):
    service_type_name = serializers.CharField(source='service.type.name', read_only=True)
    operation_type_name = serializers.CharField(source='operation.name', read_only=True)
    patient_username = serializers.CharField(source='service.patient.username', read_only=True)
    doctor_username = serializers.CharField(source='service.doctor.username', read_only=True)
    class Meta:
        model = Service_Operation
        fields = '__all__'
        read_only_fields = 'id', 'service'

    def validate(self, data):
        service_id = self.context.get('service_id')
        service = Service.objects.get(pk=service_id)
        data['service'] = service
        return super().validate(data)
    
class AppointmentSerializer(serializers.ModelSerializer):
    doctor_username = serializers.CharField(source='service.doctor.username', read_only=True)
    patient_username = serializers.CharField(source='service.patient.username', read_only=True)
    service_type = serializers.CharField(source='service.type.name', read_only=True)
    class Meta:
        model = Appointment
        fields = 'id','service', 'status', 'date_and_time', 'created_at', 'updated_at', 'doctor_username', 'patient_username', 'service_type'
        read_only_fields ='id', 'service', 'created_at', 'updated_at','service_type'