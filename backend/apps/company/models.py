from django.db import models
from django.core.exceptions import ValidationError


class Company(models.Model):
    """
    Company model storing official corporate and contact information
    for Jay Veer Enterprise.
    Enforces a single-instance profile so only ONE primary record exists.
    """
    company_name = models.CharField(max_length=255, help_text="Official business name (e.g. JAY VEER ENTERPRISE)")
    tagline = models.CharField(max_length=255, blank=True, help_text="Brand tagline / motto")
    description = models.TextField(blank=True, help_text="Brief company overview")
    about = models.TextField(blank=True, help_text="Full company background and capabilities")
    mission = models.TextField(blank=True, help_text="Corporate mission statement")
    vision = models.TextField(blank=True, help_text="Corporate vision statement")
    phone = models.CharField(max_length=50, blank=True, help_text="Primary business phone number(s)")
    email = models.EmailField(blank=True, help_text="Official inquiry email address")
    address = models.TextField(blank=True, help_text="Manufacturing facility / registered office address")
    city = models.CharField(max_length=100, blank=True)
    state = models.CharField(max_length=100, blank=True)
    country = models.CharField(max_length=100, default='India')
    google_maps_url = models.URLField(max_length=500, blank=True, help_text="Google Maps location link")
    whatsapp_number = models.CharField(max_length=50, blank=True, help_text="Official WhatsApp contact number")
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = 'Company Information'
        verbose_name_plural = 'Company Information'

    def __str__(self):
        return self.company_name

    def clean(self):
        super().clean()
        if not self.company_name or not self.company_name.strip():
            raise ValidationError({"company_name": "Company name is required."})

        # Enforce single primary company record
        existing = Company.objects.exclude(pk=self.pk)
        if existing.exists():
            raise ValidationError(
                "Only ONE primary Company information record is permitted. "
                "Please edit the existing company record instead of adding a new one."
            )

    def save(self, *args, **kwargs):
        self.clean()
        super().save(*args, **kwargs)
