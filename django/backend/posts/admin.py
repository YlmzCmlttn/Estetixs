from django.contrib import admin

# Register your models here.
from .models import Post, Media, Like, Comment
from .inlines import MediaInline,LikeInline, CommentInline


@admin.register(Post)
class PostAdmin(admin.ModelAdmin):
    list_display = ('user', 'caption', 'created_at', 'total_likes', 'total_comments')
    search_fields = ('caption', 'user__username', 'hashtags__name')
    list_filter = ('created_at',)
    inlines = [MediaInline, LikeInline,CommentInline]
    #prepopulated_fields = {'slug': ('caption',)}

    def total_likes(self, obj):
        return obj.likes.count()

    def total_comments(self, obj):
        return obj.comments.count()

    total_likes.short_description = 'Likes'
    total_comments.short_description = 'Comments'

@admin.register(Media)
class MediaAdmin(admin.ModelAdmin):
    list_display = ('post', 'media_type', 'created_at')
    search_fields = ('post__caption', 'media_type')
    list_filter = ('media_type', 'created_at')

@admin.register(Like)
class LikeAdmin(admin.ModelAdmin):
    list_display = ('user', 'post', 'created_at')
    search_fields = ('user__username', 'post__caption')
    list_filter = ('created_at',)

@admin.register(Comment)
class CommentAdmin(admin.ModelAdmin):
    list_display = ('user', 'post', 'content', 'created_at')
    search_fields = ('user__username', 'post__caption', 'content')
    list_filter = ('created_at',)