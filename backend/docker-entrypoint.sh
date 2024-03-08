#!/bin/bash

# Collect static files
echo "Collect static files"
#python manage.py collectstatic --noinput

echo "Apply database make migrations"
python manage.py makemigrations users profiles services

# Apply database migrations
echo "Apply database migrations"
python manage.py migrate

# Start server
echo "Starting server"
python manage.py runserver 0.0.0.0:8000