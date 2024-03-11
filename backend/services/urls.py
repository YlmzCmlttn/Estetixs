from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import ServiceCreateView, ServiceViewSet, Doctor_Service_TypeViewSet, Doctor_Operation_TypeViewSet, Appointment_ViewSet,Service_OperationViewSet,Doctors_Patients_ViewSet

default_router = DefaultRouter()
default_router.register(r'types', Doctor_Service_TypeViewSet, basename='types')
default_router.register(r'operations', Doctor_Operation_TypeViewSet, basename='operations')
default_router.register(r'appointments', Appointment_ViewSet, basename='appointments')
default_router.register(r'doctors_patients', Doctors_Patients_ViewSet, basename='doctors_patients')
default_router.register(r'', ServiceViewSet, basename='service')
urlpatterns =[
    path('create/', ServiceCreateView.as_view(), name='create'),
    path('<int:service_id>/operations/', include([
        path('', Service_OperationViewSet.as_view({'get': 'list', 'post': 'create'}), name='service-operations-list'),
        path('<int:pk>/', Service_OperationViewSet.as_view({'get': 'retrieve', 'put': 'update', 'delete': 'destroy'}), name='service-operation-detail'),
    ])),
] + default_router.urls