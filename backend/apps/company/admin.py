from django.contrib import admin
from django.forms import Textarea
from django.db import models
from .models import Company


@admin.register(Company)
class CompanyAdmin(admin.ModelAdmin):
    """
    Django Admin configuration for Jay Veer Enterprise Company profile.
    Enforces a single-instance profile with structured fieldsets.
    """
    list_display = ('company_name', 'phone', 'email', 'city')
    search_fields = ('company_name', 'phone', 'email')
    readonly_fields = ('created_at', 'updated_at')

    # Ergonomic textareas for corporate text
    formfield_overrides = {
        models.TextField: {'widget': Textarea(attrs={'rows': 3, 'style': 'width: 100%; max-width: 700px;'})},
    }

    fieldsets = (
        ('Company Identity', {
            'fields': ('company_name', 'tagline', 'description'),
            'description': 'Official brand identity and summary tagline for Jay Veer Enterprise.'
        }),
        ('About & Strategic Vision', {
            'fields': ('about', 'mission', 'vision'),
            'description': 'Detailed company background, mission, and long-term business vision.'
        }),
        ('Contact Channels', {
            'fields': ('phone', 'whatsapp_number', 'email'),
            'description': 'Direct phone lines, WhatsApp numbers, and email for inquiries.'
        }),
        ('Physical & Geographic Location', {
            'fields': ('address', 'city', 'state', 'country', 'google_maps_url'),
            'description': 'Factory / administrative address and Google Maps integration.'
        }),
        ('Record Audit Timestamps', {
            'fields': ('created_at', 'updated_at'),
            'classes': ('collapse',),
            'description': 'System-generated audit timestamps.'
        }),
    )

    def has_add_permission(self, request):
        # Only allow ONE primary Company record.
        # If one already exists in the database, the 'Add Company' button is disabled.
        if Company.objects.exists():
            return False
        return super().has_add_permission(request)
