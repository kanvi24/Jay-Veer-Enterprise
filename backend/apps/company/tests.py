from django.test import TestCase
from django.urls import reverse
from rest_framework.test import APIClient
from rest_framework import status
from .models import Company


class CompanyAPITests(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.company_url = reverse('company:company-detail')

    def test_get_company_not_found(self):
        """When no company record exists, API should return 404."""
        response = self.client.get(self.company_url)
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)
        self.assertIn("detail", response.data)

    def test_get_company_success(self):
        """When company record exists, API should return 200 with company info."""
        company = Company.objects.create(
            company_name="Jay Veer Enterprise",
            tagline="Your Trusted Partner in Plastic Raw Materials",
            description="Leading supplier of plastic granules and masterbatches.",
            phone="+91 90990 66131",
            email="info@jayveerenterprise.com",
            city="Ahmedabad",
            state="Gujarat",
            country="India"
        )
        response = self.client.get(self.company_url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data["company_name"], "Jay Veer Enterprise")
        self.assertEqual(response.data["tagline"], "Your Trusted Partner in Plastic Raw Materials")
        self.assertEqual(response.data["email"], "info@jayveerenterprise.com")
