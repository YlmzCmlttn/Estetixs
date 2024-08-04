# forms.py
from django import forms
from .models import AppointmentHistory, User

class AppointmentHistoryForm(forms.ModelForm):
    class Meta:
        model = AppointmentHistory
        fields = '__all__'
    
    def __init__(self, *args, **kwargs):
        super(AppointmentHistoryForm, self).__init__(*args, **kwargs)        
        if 'instance' in kwargs:
            instance = kwargs['instance']
            self.fields['changed_by'].queryset = User.objects.filter(
                id__in=[instance.appointment.service.doctor.id, instance.appointment.service.patient.id]
            )
