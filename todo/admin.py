from django.contrib import admin
from .models import Todo


# Register your models here.
class TodoAdmin(admin.ModelAdmin):
    list_display = ("id", "title", "description", "data", "done",)
    list_display_links = ("id", "title",)
    search_field = ("id", "title", "description",)
    list_editable = ("done",)
    list_filter = ("done",)


admin.site.register(Todo, TodoAdmin)
