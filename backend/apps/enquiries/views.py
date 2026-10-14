from rest_framework import generics
from rest_framework.response import Response
from rest_framework import status
from .models import Enquiry
from .serializers import EnquirySerializer


class EnquiryCreateView(generics.CreateAPIView):
    """
    Public endpoint to submit a new business enquiry for Jay Veer Enterprise.
    POST /api/enquiries/
    Returns:
    - 201 Created on success
    - 400 Bad Request on validation errors
    """
    queryset = Enquiry.objects.all()
    serializer_class = EnquirySerializer

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            enquiry = serializer.save()
            return Response(
                {
                    "message": "Enquiry submitted successfully. Our team will contact you shortly.",
                    "data": serializer.data
                },
                status=status.HTTP_201_CREATED
            )
        return Response(
            {
                "message": "Validation error occurred.",
                "errors": serializer.errors
            },
            status=status.HTTP_400_BAD_REQUEST
        )
