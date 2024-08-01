import os
import django
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'api.settings')
django.setup()
from django.contrib.auth import get_user_model


User = get_user_model()

# Create Admin Superuser
if not User.objects.filter(email='admin@example.com').exists():
    User.objects.create_superuser(
        email='admin@example.com',
        password='sananesanane',
    )
    print('Admin superuser created.')
else:
    print('Admin superuser already exists.')


