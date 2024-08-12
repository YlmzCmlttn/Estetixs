#!/bin/bash

# Collect static files
echo "Collect static files"
#python manage.py collectstatic --noinput

echo "Apply database make migrations"
python manage.py makemigrations users profiles services

# Apply database migrations
echo "Apply database migrations"
python manage.py migrate


# Create superuser
echo "Creating superuser"
python create_superuser.py

# Create example users
echo "Creating example users"
python create_exampleusers.py

# Start server
echo "Starting server"
python manage.py runserver 0.0.0.0:8000