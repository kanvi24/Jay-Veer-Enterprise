from django.db import models


class Enquiry(models.Model):
    """
    Business enquiry model capturing prospective customer interest
    for Jay Veer Enterprise plastic raw materials.
    """
    name = models.CharField(max_length=150, help_text="Contact person name")
    company_name = models.CharField(max_length=200, blank=True, help_text="Customer company or trading firm name")
    phone = models.CharField(max_length=30, help_text="Contact telephone or mobile number")
    email = models.EmailField(blank=True, help_text="Contact email address")
    product = models.CharField(max_length=200, help_text="Product or granule category required")
    quantity = models.CharField(max_length=100, blank=True, help_text="Estimated volume or tonnage required")
    message = models.TextField(blank=True, help_text="Specific processing details or requirements")
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-created_at']
        verbose_name = 'Business Enquiry'
        verbose_name_plural = 'Business Enquiries'

    def __str__(self):
        return f"{self.name} - {self.product} ({self.created_at.strftime('%Y-%m-%d %H:%M')})"
