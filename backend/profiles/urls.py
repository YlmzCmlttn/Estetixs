from django.urls import path
from rest_framework.routers import DefaultRouter
from .views import UserProfileViewSet, DoctorProfileViewSet


router = DefaultRouter()
router.register(r'doctor', DoctorProfileViewSet, basename='doctor')
router.register(r'', UserProfileViewSet, basename='profile')
urlpatterns = router.urls