from django.contrib import admin

# Register your models here.
from .models import Like,Media,Comment
class MediaInline(admin.TabularInline):
    model = Media
    extra = 1
    readonly_fields = ('file','media_type', 'created_at')

class LikeInline(admin.TabularInline):
    model = Like
    extra = 1
    readonly_fields = ('user', 'created_at')

class CommentInline(admin.TabularInline):
    model = Comment
    extra = 1
    readonly_fields = ('user', 'content', 'created_at')
