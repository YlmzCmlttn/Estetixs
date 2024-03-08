from django.contrib.auth import get_user_model
from rest_framework import serializers

from .models import UserProfile, PatientProfile, DoctorProfile
from users.models import User
from django.core.exceptions import ValidationError
from rest_framework.exceptions import ValidationError as DRFValidationError

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = get_user_model()
        fields = ('id', 'username', 'email', 'first_name', 'last_name')
        read_only_fields = ('id', 'is_active', 'is_staff', 'is_superuser', 'last_login', 'date_joined')

class UserProfileSerializer(serializers.ModelSerializer):
    username = serializers.CharField(source='user.username', required=False)
    email = serializers.CharField(source='user.email', required=False)
    first_name = serializers.CharField(source='user.first_name', required=False)
    last_name = serializers.CharField(source='user.last_name', required=False)

    class Meta:
        model = UserProfile
        fields = ('username', 'email', 'first_name', 'last_name', 'country', 'state', 'city', 'address', 'zip_code', 'phone', 'date_of_birth')
    
    def update(self, instance, validated_data):
        userSerializer = UserSerializer(instance.user, validated_data.pop('user', {}), partial=True)
        userSerializer.is_valid(raise_exception=True)
        userSerializer.save()
        return super().update(instance, validated_data)
    
class DoctorProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = DoctorProfile
        fields = '__all__'
        extra_kwargs = {'user': {'read_only': True}, 'doctor_id': {'read_only': True}}

class PatientProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = PatientProfile
        fields = '__all__'
        extra_kwargs = {'user': {'read_only': True}, 'patient_id': {'read_only': True}}