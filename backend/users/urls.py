from django.urls import path
from .views import SignupView, LoginTokenView, LogoutView




urlpatterns = [
    path('signup/', SignupView.as_view(), name='signup'),
    path('login/', LoginTokenView.as_view(), name='login'),
    path('logout/', LogoutView.as_view(), name='logout'),
    #path('login/', LoginViewSet, name='login'),
    #path('logout/', LogoutView.as_view(), name='logout'),
]
