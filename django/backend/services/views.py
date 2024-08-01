from django.db.models import Max
from rest_framework import status
from rest_framework.authentication import TokenAuthentication
from rest_framework import viewsets, mixins

from .models import Service, Doctor_Service_Type, Doctor_Operation_Type, Appointment, Service_Operation
from .serializers import ServiceCreateSerializer, ServiceSerializer, Doctor_Service_TypeSerializer, Doctor_Operation_TypeSerializer, AppointmentSerializer, Service_OperationSerializer
from .permissions import IsServiceOwner, IsDoctorOrReadOnly, IsAppointmentOwner,IsServiceTypeOwnerOrReadOnly,IsPatient,IsServiceOperationOwner,IsDoctor
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
    

    
class Doctors_Patients_ViewSet(mixins.ListModelMixin, 
                               mixins.RetrieveModelMixin,
                               viewsets.GenericViewSet):
    serializer_class = ServiceSerializer
    authentication_classes = (TokenAuthentication,)
    permission_classes = (IsDoctor,)

    def get_queryset(self):
        if self.request.user.is_doctor:
            return Service.objects.filter(doctor=self.request.user)
        if self.request.user.is_staff:
            return Service.objects.all()
        return Service.objects.none()
    
    def list(self, request, *args, **kwargs):
        return self.get_patients(request)
    
    def retrieve(self, request, *args, **kwargs):
        return self.patient_detail(request, kwargs['pk'])
    
    def get_patients(self, request):
        if request.user.is_doctor:
            services = Service.objects.filter(doctor=request.user).annotate(
                latest_update=Max('updated_at')).order_by('-latest_update')

            ordered_patients = {}
            for service in services:
                print(service.patient.id)
                if service.patient.id not in ordered_patients:
                    ordered_patients[service.patient.id] = service.patient

            response_data = [{'id': patient.id, 'username': patient.username} for patient in ordered_patients.values()]
            return Response(response_data)

        return Response([])

    def patient_detail(self, request, pk=None):
        if request.user.is_doctor:
            patient_services = Service.objects.filter(doctor=request.user, patient_id=pk).order_by('-updated_at')
            patient_username = Service.objects.filter(doctor=request.user, patient_id=pk).values('patient__username').first()
            if patient_services:
                serializer = self.get_serializer(patient_services, many=True)
                return Response({'username': patient_username['patient__username'], 'services': serializer.data})
            else:
                return Response({'error': 'No services found for this patient or patient does not exist.'}, status=status.HTTP_404_NOT_FOUND)
        
        return Response({'error': 'You do not have permission to view this.'}, status=status.HTTP_403_FORBIDDEN)
    
