
from rest_framework import generics
from rest_framework.authentication import TokenAuthentication
from rest_framework import viewsets, mixins
from django.shortcuts import get_object_or_404
from .permissions import IsProfileOwnerOrReadOnly

from .models import UserProfile, DoctorProfile, PatientProfile
from users.models import User
from .serializers import UserProfileSerializer, DoctorProfileSerializer, PatientProfileSerializer

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