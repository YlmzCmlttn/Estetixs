from django.contrib.auth.forms import UserCreationForm, UserChangeForm

from .models import User, Patient

class CustomUserCreationForm(UserCreationForm):
    class Meta(UserCreationForm):
        model = User
        fields = UserCreationForm.Meta.fields + ('role',)

class CustomUserChangeForm(UserChangeForm):
    class Meta(UserChangeForm):
        model = User
        fields = UserChangeForm.Meta.fields

class PatientCreationForm(UserCreationForm):
    class Meta(UserCreationForm):
        model = Patient
        fields = UserCreationForm.Meta.fields

class PatientChangeForm(UserChangeForm):
    class Meta(UserChangeForm):
        model = Patient
        fields = UserChangeForm.Meta.fields

class DoctorCreationForm(UserCreationForm):
    class Meta(UserCreationForm):
        model = User
        fields = UserCreationForm.Meta.fields

class DoctorChangeForm(UserChangeForm):
    class Meta(UserChangeForm):
        model = User
        fields = UserChangeForm.Meta.fields