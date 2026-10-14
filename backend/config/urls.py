"""
URL configuration for Jay Veer Enterprise backend.
"""

from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path('admin/', admin.site.urls),

    # Business API Endpoints
    path('api/company/', include('apps.company.urls')),
    path('api/products/', include('apps.products.urls')),
    path('api/enquiries/', include('apps.enquiries.urls')),
]

# Serve media files in development
if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)

admin.site.site_header = "Jay Veer Enterprise Admin"
admin.site.site_title = "Jay Veer Enterprise Admin"
admin.site.index_title = "Jay Veer Enterprise Content & Product Management"
