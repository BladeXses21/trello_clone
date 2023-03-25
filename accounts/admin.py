from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import UserAccount


class UserAccountAdmin(UserAdmin):
    list_display = ('name', 'email', 'is_active', 'is_staff')
    search_fields = ('name', 'email',)
    readonly_fields = ('name',)
    ordering = ('name',)

    filter_horizontal = ()
    list_filter = ()
    fieldsets = ()


admin.site.register(UserAccount, UserAccountAdmin)
