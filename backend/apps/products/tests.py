from django.test import TestCase
from django.urls import reverse
from rest_framework.test import APIClient
from rest_framework import status
from .models import Product


class ProductAPITests(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.list_url = reverse('products:product-list')

        # Create active products
        self.p1 = Product.objects.create(
            name="Filler Granules",
            slug="filler-granules",
            short_description="High purity filler for better strength & finish.",
            description="Compounded with micronized CaCO3.",
            applications="Woven Sacks, Blow Moulding",
            is_active=True
        )
        self.p2 = Product.objects.create(
            name="LD Granules",
            slug="ld-granules",
            short_description="Premium LD granules for various plastic applications.",
            description="Low-density polyethylene pellets.",
            applications="Packaging Films, Squeeze Bottles",
            is_active=True
        )
        # Create inactive product
        self.p_inactive = Product.objects.create(
            name="Archived Polymer",
            slug="archived-polymer",
            short_description="Discontinued test item.",
            is_active=False
        )

    def test_list_products_returns_only_active(self):
        """GET /api/products/ should return 200 and only active products."""
        response = self.client.get(self.list_url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        # Should return only the 2 active products
        self.assertEqual(len(response.data), 2)
        slugs = [item["slug"] for item in response.data]
        self.assertIn("filler-granules", slugs)
        self.assertIn("ld-granules", slugs)
        self.assertNotIn("archived-polymer", slugs)

    def test_retrieve_active_product_success(self):
        """GET /api/products/<slug>/ should return 200 with product details."""
        detail_url = reverse('products:product-detail', kwargs={'slug': 'filler-granules'})
        response = self.client.get(detail_url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data["name"], "Filler Granules")
        self.assertEqual(response.data["slug"], "filler-granules")

    def test_retrieve_inactive_product_returns_404(self):
        """GET /api/products/<inactive-slug>/ should return 404."""
        detail_url = reverse('products:product-detail', kwargs={'slug': 'archived-polymer'})
        response = self.client.get(detail_url)
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)

    def test_retrieve_non_existent_product_returns_404(self):
        """GET /api/products/does-not-exist/ should return 404."""
        detail_url = reverse('products:product-detail', kwargs={'slug': 'does-not-exist'})
        response = self.client.get(detail_url)
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)
