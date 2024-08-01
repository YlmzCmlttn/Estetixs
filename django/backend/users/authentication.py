# authentication.py

from django.utils import timezone
from rest_framework import authentication, exceptions
from .models import ExpirableToken

class ExpirableTokenAuthentication(authentication.TokenAuthentication):
    model = ExpirableToken

    def authenticate_credentials(self, key):
        model = self.get_model()
        try:
            token = model.objects.select_related('user').get(key=key)
            if token.is_expired():
                raise exceptions.AuthenticationFailed('Token has expired')
        except model.DoesNotExist:
            raise exceptions.AuthenticationFailed('Invalid token')

        if not token.user.is_active:
            raise exceptions.AuthenticationFailed('User inactive or deleted')

        return (token.user, token)
