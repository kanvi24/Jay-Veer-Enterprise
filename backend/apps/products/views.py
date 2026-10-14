from rest_framework import generics
from rest_framework.response import Response
from rest_framework import status
from .models import Product
from .serializers import ProductSerializer


class ProductListView(generics.ListAPIView):
    """
    Public catalog endpoint returning all active plastic raw materials & granules.
    GET /api/products/
    """
    serializer_class = ProductSerializer

    def get_queryset(self):
        # Only active products are returned to the public
        return Product.objects.filter(is_active=True)


class ProductDetailView(generics.RetrieveAPIView):
    """
    Public detail endpoint returning a single active product by slug.
    GET /api/products/<slug>/
    Returns 404 if product does not exist or is marked inactive.
    """
    serializer_class = ProductSerializer
    lookup_field = 'slug'

    def get_queryset(self):
        # Only active products can be retrieved
        return Product.objects.filter(is_active=True)
