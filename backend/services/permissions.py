from rest_framework.permissions import BasePermission, SAFE_METHODS

class IsServiceOwner(BasePermission):
    def has_object_permission(self, request, view, obj):
        return obj.doctor == request.user or obj.patient == request.user
    
class IsPatient(BasePermission):
    def has_permission(self, request, view):
        return request.user.is_patient
    
class IsDoctorOrReadOnly(BasePermission):
    def has_permission(self, request, view):
        if request.method in SAFE_METHODS:
            return True
        return request.user.is_doctor
    
class IsServiceTypeOwnerOrReadOnly(BasePermission):
    def has_permission(self, request, view):
        if request.method in SAFE_METHODS:
            return True
        return request.user.is_doctor
    
    def has_object_permission(self, request, view, obj):
        if request.method in SAFE_METHODS:
            return True
        return obj.doctor == request.user

class IsPatientOrNotCreate(BasePermission):
    def has_permission(self, request, view):
        if request.method == 'POST':
            return request.user.is_patient
        return True

class IsAppointmentOwner(BasePermission):
    def has_object_permission(self, request, view, obj):
        return obj.service.doctor == request.user or obj.service.patient == request.user

class IsServiceOperationOwner(BasePermission):
    def has_object_permission(self, request, view, obj):
        return obj.service.doctor == request.user or obj.service.patient == request.user