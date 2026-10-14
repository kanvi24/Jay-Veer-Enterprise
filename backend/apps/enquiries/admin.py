from django.contrib import admin
from .models import Enquiry


@admin.register(Enquiry)
class EnquiryAdmin(admin.ModelAdmin):
    """
    Django Admin interface for reviewing business quotation enquiries
    submitted by converters, molders, and prospective buyers.
    """
    # List view matching prompt requirements:
    # Name, Company Name, Phone, Email, Product, Quantity, Created Date
    list_display = (
        'name',
        'company_name',
        'phone',
        'email',
        'product',
        'quantity',
        'created_at',
    )
    # Search by name, company name, phone, email
    search_fields = ('name', 'company_name', 'phone', 'email')
    # Filter by created_at and product
    list_filter = ('created_at', 'product')

    # All fields read-only so visitor submissions cannot be tampered with
    readonly_fields = (
        'name',
        'company_name',
        'phone',
        'email',
        'product',
        'quantity',
        'message',
        'created_at',
    )

    fieldsets = (
        ('Contact Person & Enterprise', {
            'fields': ('name', 'company_name', 'phone', 'email'),
            'description': 'Prospective client contact information.'
        }),
        ('Requirement Details', {
            'fields': ('product', 'quantity'),
            'description': 'Requested raw material category and estimated order volume.'
        }),
        ('Message & Processing Notes', {
            'fields': ('message',),
            'description': 'Customer inquiry specifications and comments.'
        }),
        ('Submission Record', {
            'fields': ('created_at',),
            'description': 'Exact timestamp when inquiry was received.'
        }),
    )

    def has_add_permission(self, request):
        # Enquiries are submitted by website visitors via public API
        return False
