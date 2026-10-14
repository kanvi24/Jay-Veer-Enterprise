from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import Company
from .serializers import CompanySerializer


class CompanyDetailView(APIView):
    """
    Retrieve official company information for Jay Veer Enterprise.
    Returns 200 with company data when configured, or 404 if no record exists yet.
    """
    def get(self, request, *args, **kwargs):
        company = Company.objects.first()
        if not company:
            return Response(
                {
                    "detail": "Company information not found. No company profile has been created yet."
                },
                status=status.HTTP_404_NOT_FOUND
            )
        serializer = CompanySerializer(company)
        return Response(serializer.data, status=status.HTTP_200_OK)
