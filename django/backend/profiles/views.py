
from rest_framework import generics
from rest_framework.authentication import TokenAuthentication
from rest_framework import viewsets, mixins
from django.shortcuts import get_object_or_404
from .permissions import IsProfileOwnerOrReadOnly

from .models import UserProfile, DoctorProfile, PatientProfile
from users.models import User, Doctor
from .serializers import UserProfileSerializer, DoctorProfileSerializer, PatientProfileSerializer

from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework import mixins
from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework import status

from services.models import Doctor_Service_Type, Doctor_Operation_Type
from services.serializers import Doctor_Service_TypeSerializer, Doctor_Operation_TypeSerializer
#from .permissions import IsOwner


class UserProfileViewSet(mixins.RetrieveModelMixin,
                         mixins.UpdateModelMixin,
                         mixins.DestroyModelMixin,
                         mixins.ListModelMixin,
                         viewsets.GenericViewSet):
    queryset = UserProfile.objects.all()
    serializer_class = UserProfileSerializer
    authentication_classes = (TokenAuthentication,)
    permission_classes = (IsProfileOwnerOrReadOnly, )


    
class DoctorProfileViewSet(mixins.ListModelMixin, 
                               mixins.RetrieveModelMixin,
                               viewsets.GenericViewSet):
    
    permission_classes = (AllowAny,)
    authentication_classes = ()

    def get_doctor_profile(self,doctor_username):
        user = User.objects.get(username=doctor_username)
        user_profile = DoctorProfile.objects.get(user=user)

        service_types = Doctor_Service_Type.objects.filter(doctor=user)
        operation_types = Doctor_Operation_Type.objects.filter(doctor=user)
        return user_profile, service_types, operation_types
    #doesn't work
    def list(self, request, *args, **kwargs):
        doctors = User.objects.filter(role="DOCTOR")
        serializer = DoctorProfileSerializer(doctors, many=True)
        return Response(serializer.data)
    
    def retrieve(self, request, *args, **kwargs):
        print('retrieve')
        doctor_username = kwargs['pk']
        user_profile, service_types, operation_types = self.get_doctor_profile(doctor_username)

        if user_profile:
            user_profile_serializer = DoctorProfileSerializer(user_profile)
            service_types_serializer = Doctor_Service_TypeSerializer(service_types, many=True)
            operation_types_serializer = Doctor_Operation_TypeSerializer(operation_types, many=True)
            
            return Response({
                'user_profile': user_profile_serializer.data,
                'service_types': service_types_serializer.data,
                'operation_types': operation_types_serializer.data
            })
        else:
            return Response({'error': 'Doctor profile not found'}, status=status.HTTP_404_NOT_FOUND)


# class UserProfileDetailView(mixins.RetrieveModelMixin,
#                             mixins.UpdateModelMixin,
#                             generics.GenericAPIView):
#     serializer_class = UserProfileSerializer
#     authentication_classes = (TokenAuthentication,)
#     permission_classes = (IsAuthenticated, IsProfileOwnerOrReadOnly,)

#     def get_object(self):
#         username = self.kwargs.get('username', None)        
#         if username is not None:
#             user = get_object_or_404(User, username=username)            
#             if user.is_staff and not user == self.request.user:
#                 obj = get_object_or_404(UserProfile, user=None)
#                 self.check_object_permissions(self.request, obj)
#                 return obj             
#             obj = get_object_or_404(UserProfile, user=user)                
#             self.check_object_permissions(self.request, obj)
#             return obj 
#         obj = get_object_or_404(UserProfile, user=self.request.user)
#         self.check_object_permissions(self.request, obj)
#         return obj 

#     def get(self, request, *args, **kwargs):
#         return self.retrieve(request, *args, **kwargs)
    
#     def put(self, request, *args, **kwargs):
#         return self.update(request, *args, **kwargs)
    
# class DoctorProfileDetailView(mixins.RetrieveModelMixin,
#                             mixins.UpdateModelMixin,
#                             generics.GenericAPIView):
#     queryset = DoctorProfile.objects.all()
#     serializer_class = DoctorProfileSerializer
#     authentication_classes = (TokenAuthentication,)
#     permission_classes = (IsAuthenticated, IsProfileOwnerOrReadOnly,)

#     def get_object(self):
#         obj = get_object_or_404(DoctorProfile, user=self.request.user)
#         self.check_object_permissions(self.request, obj)
#         return obj
    
#     def get(self, request, *args, **kwargs):
#         return self.retrieve(request, *args, **kwargs)

#     def put(self, request, *args, **kwargs):
#         return self.update(request, *args, **kwargs)
    
# class PatientProfileDetailView(mixins.RetrieveModelMixin,
#                             mixins.UpdateModelMixin,
#                             generics.GenericAPIView):
#     queryset = PatientProfile.objects.all()
#     serializer_class = PatientProfileSerializer
#     authentication_classes = (TokenAuthentication,)
#     permission_classes = (IsAuthenticated, IsProfileOwnerOrReadOnly,)

#     def get_object(self):
#         obj = get_object_or_404(PatientProfile, user=self.request.user)
#         self.check_object_permissions(self.request, obj)
#         return obj

#     def get(self, request, *args, **kwargs):
#         return self.retrieve(request, *args, **kwargs)

#     def put(self, request, *args, **kwargs):
#         return self.update(request, *args, **kwargs)