from rest_framework import serializers
from .models import Company


class CompanySerializer(serializers.ModelSerializer):
    """
    Serializer for Company information.
    """
    class Meta:
        model = Company
        fields = [
            'id',
            'company_name',
            'tagline',
            'description',
            'about',
            'mission',
            'vision',
            'phone',
            'email',
            'address',
            'city',
            'state',
            'country',
            'google_maps_url',
            'whatsapp_number',
            'created_at',
            'updated_at',
        ]
        read_only_fields = ['id', 'created_at', 'updated_at']

