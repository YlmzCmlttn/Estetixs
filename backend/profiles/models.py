from django.db import models

from users.models import User

# Create your models here.
class UserProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    country = models.CharField(max_length=150, null=True, blank=True)
    state = models.CharField(max_length=150, null=True, blank=True)
    city = models.CharField(max_length=150, null=True, blank=True)
    address = models.TextField(null=True, blank=True)
    zip_code = models.CharField(max_length=150, null=True, blank=True)
    phone = models.CharField(max_length=150, null=True, blank=True)
    date_of_birth = models.DateField(null=True, blank=True)
            

    def __str__(self):
        return self.user.username
    
class PatientProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    patient_id = models.BigAutoField(primary_key=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

        

class DoctorProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    doctor_id = models.BigAutoField(primary_key=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    


#Patient

    #blood_group = models.CharField(max_length=150, null=True, blank=True)
    #weight = models.CharField(max_length=150, null=True, blank=True)
    #height = models.CharField(max_length=150, null=True, blank=True)
    #allergies = models.TextField(null=True, blank=True)
    #medical_history = models.TextField(null=True, blank=True)
    #current_medications = models.TextField(null=True, blank=True)
    #profile_picture = models.ImageField(upload_to='profile_picture', null=True, blank=True)
    #signature = models.ImageField(upload_to='signature', null=True, blank=True)
    #about = models.TextField(null=True, blank=True)
    #status = models.BooleanField(default=True)
    #created_at = models.DateTimeField(auto_now_add=True)
    #updated_at = models.DateTimeField(auto_now=True)

#Doctor
    #specialization = models.CharField(max_length=150, null=True, blank=True)
    #degree = models.CharField(max_length=150, null=True, blank=True)
    #experience = models.CharField(max_length=150, null=True, blank=True)
    #registration_no = models.CharField(max_length=150, null=True, blank=True)
    #registration_council = models.CharField(max_length=150, null=True, blank=True)
    #registration_year = models.DateField(null=True, blank=True)
    #registration_certificate = models.FileField(upload_to='registration_certificate', null=True, blank=True)
    #profile_picture = models.ImageField(upload_to='profile_picture', null=True, blank=True)
    #signature = models.ImageField(upload_to='signature', null=True, blank=True)
    #about = models.TextField(null=True, blank=True)
    #awards = models.TextField(null=True, blank=True)
    #education = models.TextField(null=True, blank=True)
    #experience = models.TextField(null=True, blank=True)
    #membership = models.TextField(null=True, blank=True)
    #publications = models.TextField(null=True, blank=True)
    #conferences = models.TextField(null=True, blank=True)
    #seminars = models.TextField(null=True, blank=True)
    #workshops = models.TextField(null=True, blank=True)
    #webinars = models.TextField(null=True, blank=True)
    #cme = models.TextField(null=True, blank=True)
    #training = models.TextField(null=True, blank=True)
    #services = models.TextField(null=True, blank=True)
    #fees = models.TextField(null=True, blank=True)
    #availability = models.TextField(null=True, blank=True)
    #rating = models.TextField(null=True, blank=True)
    #reviews = models.TextField(null=True, blank=True)
    #status = models.BooleanField(default=True)
    #created_at = models.DateTimeField(auto_now_add=True)
    #updated_at = models.DateTimeField(auto_now=True)
