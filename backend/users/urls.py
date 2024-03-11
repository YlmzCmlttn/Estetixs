from django.urls import path
from .views import SignupView, LoginTokenView, LogoutView, MeView

urlpatterns = [
    path('signup/', SignupView.as_view(), name='signup'),
    path('login/', LoginTokenView.as_view(), name='login'),
    path('logout/', LogoutView.as_view(), name='logout'),
    path('me/', MeView.as_view(), name='me'),    
    #path('login/', LoginViewSet, name='login'),
    #path('logout/', LogoutView.as_view(), name='logout'),
]
