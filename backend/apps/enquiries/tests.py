from django.test import TestCase
from django.urls import reverse
from rest_framework.test import APIClient
from rest_framework import status
from .models import Enquiry


class EnquiryAPITests(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.enquiry_url = reverse('enquiries:enquiry-create')

    def test_create_enquiry_success(self):
        """POST /api/enquiries/ with valid data returns 201 Created."""
        payload = {
            "name": "Ramesh Patel",
            "company_name": "Gujarat Polymer Converters",
            "phone": "+91 9876543210",
            "email": "ramesh@example.com",
            "product": "Filler Granules",
            "quantity": "5 Tons",
            "message": "Looking for quotation and trial sample batch."
        }
        response = self.client.post(self.enquiry_url, payload, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertIn("message", response.data)
        self.assertEqual(Enquiry.objects.count(), 1)
        enquiry = Enquiry.objects.first()
        self.assertEqual(enquiry.name, "Ramesh Patel")
        self.assertEqual(enquiry.product, "Filler Granules")

    def test_create_enquiry_missing_required_fields(self):
        """POST /api/enquiries/ without required fields returns 400 Bad Request."""
        payload = {
            "company_name": "Test Company",
            "message": "Inquiry without name, phone, or product."
        }
        response = self.client.post(self.enquiry_url, payload, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertIn("errors", response.data)
        self.assertIn("name", response.data["errors"])
        self.assertIn("phone", response.data["errors"])
        self.assertIn("product", response.data["errors"])
        self.assertEqual(Enquiry.objects.count(), 0)

    def test_create_enquiry_invalid_phone(self):
        """POST /api/enquiries/ with an invalid short phone returns 400."""
        payload = {
            "name": "Suresh Shah",
            "phone": "123",
            "product": "LD Granules"
        }
        response = self.client.post(self.enquiry_url, payload, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertIn("phone", response.data["errors"])
