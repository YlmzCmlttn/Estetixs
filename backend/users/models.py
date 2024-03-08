from django.db import models
from django.contrib.auth.models import AbstractUser, BaseUserManager

class CustomUserManager(BaseUserManager):
    def create_user(self, email, password=None, **extra_fields):
        if not email:
            raise ValueError('The Email field must be set')
        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, password=None, **extra_fields):
        extra_fields.setdefault('role', User.Role.ADMIN)
        if extra_fields.get('role') != User.Role.ADMIN:
            raise ValueError('Superuser must have role of Admin')        
        #set staff and superuser to True
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)
        
        return self.create_user(email, password, **extra_fields)


class User(AbstractUser):
    class Role(models.TextChoices):        
        ADMIN = "ADMIN", "Admin"
        DOCTOR = "DOCTOR", "Doctor"
        PATIENT = "PATIENT", "Patient"
    
    email = models.EmailField(unique=True)
    objects = CustomUserManager()
    base_role = Role.ADMIN
    role = models.CharField(max_length=10, choices=Role.choices, default=base_role)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []

    def __str__(self):
        return self.username

    def save(self, *args, **kwargs):
        if not self.username:
            generateUserNameFromEmail = self.email.split('@')[0]
            while User.objects.filter(username=generateUserNameFromEmail).exists():
                generateUserNameFromEmail = generateUserNameFromEmail + str(User.objects.filter(username=generateUserNameFromEmail).count())
            self.username = generateUserNameFromEmail
        if not self.first_name:
            self.first_name = self.username
        if not self.role:
            self.role = self.base_role
        super().save(*args, **kwargs)

    is_patient = property(lambda self: self.role == User.Role.PATIENT)
    is_doctor = property(lambda self: self.role == User.Role.DOCTOR)



class PatientManager(BaseUserManager):
    def get_queryset(self, *args, **kwargs):
        return super().get_queryset(*args, **kwargs).filter(role=User.Role.PATIENT)
    


class Patient(User):
    base_role = User.Role.PATIENT

    patient = PatientManager()

    class Meta:
        proxy = True
        verbose_name = "Patient"
        verbose_name_plural = "Patients"

    def save(self, *args, **kwargs):
        self.role = self.base_role
        super().save(*args, **kwargs)
    
    def __str__(self):
        return self.username

class DoctorManager(BaseUserManager):
    def get_queryset(self, *args, **kwargs):
        return super().get_queryset(*args, **kwargs).filter(role=User.Role.DOCTOR)

class Doctor(User):
    base_role = User.Role.DOCTOR

    doctor = DoctorManager()

    class Meta:
        proxy = True
        verbose_name = "Doctor"
        verbose_name_plural = "Doctors"

    def save(self, *args, **kwargs):
        self.role = self.base_role
        super().save(*args, **kwargs)

    def __str__(self):
        return self.username



