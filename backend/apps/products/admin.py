from django.contrib import admin
from django import forms
from django.utils.html import format_html
from .models import Product


class ProductAdminForm(forms.ModelForm):
    """
    Ergonomic form for managing product information with sized text areas.
    """
    short_description = forms.CharField(
        widget=forms.Textarea(attrs={
            'rows': 3,
            'style': 'width: 100%; max-width: 750px;',
            'placeholder': 'Brief summary of the plastic granule/material for catalog cards...'
        }),
        required=False,
        help_text="Short overview displayed on the catalog cards."
    )
    description = forms.CharField(
        widget=forms.Textarea(attrs={
            'rows': 7,
            'style': 'width: 100%; max-width: 750px;',
            'placeholder': 'Detailed technical and processing description...'
        }),
        required=False,
        help_text="Full processing details and structural advantages."
    )
    applications = forms.CharField(
        widget=forms.Textarea(attrs={
            'rows': 4,
            'style': 'width: 100%; max-width: 750px;',
            'placeholder': 'Industrial applications (e.g. Woven Sacks, Blown Film, Injection Moulding)...'
        }),
        required=False,
        help_text="Industries and processing technologies where this product is utilized."
    )

    class Meta:
        model = Product
        fields = '__all__'


@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    """
    Django Admin interface for managing plastic raw materials and granules.
    """
    form = ProductAdminForm

    # List view matching prompt requirements: Product Name, Active Status, Created Date
    list_display = ('name', 'is_active', 'created_at')
    list_filter = ('is_active', 'created_at')
    search_fields = ('name',)
    prepopulated_fields = {'slug': ('name',)}
    list_editable = ('is_active',)
    readonly_fields = ('created_at', 'updated_at', 'image_preview')

    fieldsets = (
        ('Product Identification', {
            'fields': ('name', 'slug', 'is_active'),
            'description': 'Product name and URL identifier. Toggle Active Status to show/hide on public website.'
        }),
        ('Content & Descriptions', {
            'fields': ('short_description', 'description', 'applications'),
            'description': 'Real product descriptions and application use-cases.'
        }),
        ('Product Imagery', {
            'fields': ('image', 'image_preview'),
            'description': 'Upload authentic Jay Veer Enterprise product images (stored in media/products/).'
        }),
        ('Audit Timestamps', {
            'fields': ('created_at', 'updated_at'),
            'classes': ('collapse',),
            'description': 'System timestamps.'
        }),
    )

    def image_preview(self, obj):
        if obj.image:
            return format_html(
                '<img src="{}" style="max-height: 120px; max-width: 180px; border-radius: 6px; border: 1px solid #ccc;" alt="{}" />',
                obj.image.url,
                obj.name
            )
        return "No image uploaded yet"

    image_preview.short_description = "Image Preview"
