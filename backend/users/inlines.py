from django.contrib import admin

from profiles.models import UserProfile

class UserProfileInline(admin.StackedInline):
    model = UserProfile
    can_delete = False
    verbose_name_plural = 'User Info'
    extra = 0
    max_num = 1