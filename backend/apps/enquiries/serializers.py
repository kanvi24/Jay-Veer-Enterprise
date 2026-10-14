import re
from rest_framework import serializers
from .models import Enquiry


class EnquirySerializer(serializers.ModelSerializer):
    """
    Serializer for creating and validating business enquiries.
    """
    name = serializers.CharField(
        max_length=150,
        required=True,
        error_messages={
            'blank': 'Name is required.',
            'required': 'Name is required.'
        }
    )
    phone = serializers.CharField(
        max_length=30,
        required=True,
        error_messages={
            'blank': 'Phone number is required.',
            'required': 'Phone number is required.'
        }
    )
    product = serializers.CharField(
        max_length=200,
        required=True,
        error_messages={
            'blank': 'Product selection is required.',
            'required': 'Product selection is required.'
        }
    )

    class Meta:
        model = Enquiry
        fields = [
            'id',
            'name',
            'company_name',
            'phone',
            'email',
            'product',
            'quantity',
            'message',
            'created_at',
        ]
        read_only_fields = ['id', 'created_at']

    def validate_name(self, value):
        cleaned = value.strip()
        if len(cleaned) < 2:
            raise serializers.ValidationError("Name must be at least 2 characters long.")
        return cleaned

    def validate_phone(self, value):
        cleaned = value.strip()
        # Remove common separators like spaces, hyphens, plus
        digits_only = re.sub(r'[\s\-\+\(\)]', '', cleaned)
        if len(digits_only) < 7:
            raise serializers.ValidationError("Please provide a valid contact phone number.")
        return cleaned

    def validate_product(self, value):
        cleaned = value.strip()
        if not cleaned:
            raise serializers.ValidationError("Product name cannot be empty.")
        return cleaned
