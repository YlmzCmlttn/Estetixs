
from rest_framework.authentication import TokenAuthentication
from rest_framework import viewsets, mixins

from .models import Service, Doctor_Service_Type, Doctor_Operation_Type, Appointment, Service_Operation
from .serializers import ServiceCreateSerializer, ServiceSerializer, Doctor_Service_TypeSerializer, Doctor_Operation_TypeSerializer, AppointmentSerializer, Service_OperationSerializer
from .permissions import IsServiceOwner, IsDoctorOrReadOnly, IsAppointmentOwner,IsServiceTypeOwnerOrReadOnly,IsPatient,IsServiceOperationOwner
from rest_framework.response import Response
from rest_framework import generics
from rest_framework import viewsets, mixins

from rest_framework.decorators import action

class ServiceCreateView(generics.CreateAPIView):
    queryset = Service.objects.all()
    serializer_class = ServiceCreateSerializer
    authentication_classes = (TokenAuthentication,)
    permission_classes = (IsPatient, )

    def perform_create(self, serializer):
        serializer.save(patient=self.request.user)
                         
class ServiceViewSet(mixins.ListModelMixin,mixins.RetrieveModelMixin,mixins.UpdateModelMixin,viewsets.GenericViewSet):
    serializer_class = ServiceSerializer
    authentication_classes = (TokenAuthentication,)
    permission_classes = (IsServiceOwner, IsDoctorOrReadOnly,)

    def get_queryset(self):
        if self.request.user.is_doctor:
            return Service.objects.filter(doctor=self.request.user)
        if self.request.user.is_patient:
            return Service.objects.filter(patient=self.request.user)
        if self.request.user.is_staff:
            return Service.objects.all()
        return Service.objects.none()
    
class Doctor_Service_TypeViewSet(viewsets.ModelViewSet):    
    serializer_class = Doctor_Service_TypeSerializer
    authentication_classes = (TokenAuthentication,)
    permission_classes = (IsServiceTypeOwnerOrReadOnly,)

    def get_queryset(self):
        params = self.request.query_params
        if 'doctor' in params:
            return Doctor_Service_Type.objects.filter(doctor=params['doctor'])        
        else:
            if self.request.user.is_doctor:
                return Doctor_Service_Type.objects.filter(doctor=self.request.user)
            return Doctor_Service_Type.objects.all()

    def perform_create(self, serializer):
        serializer.save(doctor=self.request.user)

class Doctor_Operation_TypeViewSet(viewsets.ModelViewSet):
    serializer_class = Doctor_Operation_TypeSerializer
    authentication_classes = (TokenAuthentication,)
    permission_classes = (IsServiceTypeOwnerOrReadOnly,)

    def get_queryset(self):
        params = self.request.query_params
        if 'doctor' in params:
            if 'type' in params:
                return Doctor_Operation_Type.objects.filter(
                    doctor=params['doctor'],
                    operation_type__service_type_id=params['type'])
            return Doctor_Operation_Type.objects.filter(doctor=params['doctor'])
        else:
            if self.request.user.is_doctor:
                return Doctor_Operation_Type.objects.filter(doctor=self.request.user)
            return Doctor_Operation_Type.objects.all()

    def perform_create(self, serializer):
        serializer.save(doctor=self.request.user)
##NEED TO FIX
class Service_OperationViewSet(viewsets.ModelViewSet):
    serializer_class = Service_OperationSerializer
    authentication_classes = (TokenAuthentication,)
    permission_classes = (IsServiceOperationOwner,)

    def get_queryset(self):
        service_id = self.kwargs.get('service_id')
        return Service_Operation.objects.filter(service=service_id)
    
    def get_serializer_context(self):
        context = super().get_serializer_context()
        context['service_id'] = self.kwargs.get('service_id')
        return context

    def perform_create(self, serializer):
        service_id = self.kwargs.get('service_id')
        serializer.save(service=Service.objects.get(id=service_id))

class Appointment_ViewSet(viewsets.ModelViewSet):
    serializer_class = AppointmentSerializer
    token_authentication = (TokenAuthentication,)
    permission_classes = (IsAppointmentOwner,)

    def get_queryset(self):
        if self.request.user.is_doctor:
            return Appointment.objects.filter(service__doctor=self.request.user)
        if self.request.user.is_patient:
            return Appointment.objects.filter(service__patient=self.request.user)
        if self.request.user.is_staff:
            return Appointment.objects.all()
        return Appointment.objects.none()