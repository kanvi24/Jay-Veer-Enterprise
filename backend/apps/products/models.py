from django.db import models
from django.utils.text import slugify
from django.core.exceptions import ValidationError


class Product(models.Model):
    """
    Plastic raw materials & granules product model for Jay Veer Enterprise.
    Supports core categories:
    - Filler Granules
    - LD Granules
    - Reprocessed Granules
    - Color Masterbatch
    - Custom Plastic Colors
    """
    name = models.CharField(max_length=200, help_text="e.g. Filler Granules, LD Granules")
    slug = models.SlugField(max_length=220, unique=True, db_index=True)
    short_description = models.TextField(blank=True, help_text="Brief summary for catalog cards (optional)")
    description = models.TextField(blank=True, help_text="Full product details and processing info (optional)")
    applications = models.TextField(
        blank=True,
        help_text="Target industrial use-cases (e.g. Blown Film, Injection Moulding, Woven Sacks) (optional)"
    )
    image = models.ImageField(upload_to='products/', blank=True, null=True, help_text="Upload product photo (stored in media/products/)")
    is_active = models.BooleanField(
        default=True,
        db_index=True,
        help_text="Only active products will be returned in public API endpoints"
    )
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['id']
        verbose_name = 'Plastic Product'
        verbose_name_plural = 'Plastic Products'

    def __str__(self):
        return self.name

    def clean(self):
        super().clean()
        if not self.name or not self.name.strip():
            raise ValidationError({"name": "Product name is required."})
        if not self.slug:
            self.slug = slugify(self.name)

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.name)
        self.clean()
        super().save(*args, **kwargs)
