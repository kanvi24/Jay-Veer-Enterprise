"""
URL configuration for Jay Veer Enterprise backend.
"""

from django.contrib import admin
from django.urls import path, include, re_path
from django.conf import settings
from django.conf.urls.static import static
from django.views.static import serve

urlpatterns = [
    path('admin/', admin.site.urls),

    # Business API Endpoints
    path('api/company/', include('apps.company.urls')),
    path('api/products/', include('apps.products.urls')),
    path('api/enquiries/', include('apps.enquiries.urls')),

    # Media files serving (works in development and production environments)
    re_path(r'^media/(?P<path>.*)$', serve, {'document_root': settings.MEDIA_ROOT}),

    # Route /assets/products/ alias directly to media/products/ so both routes resolve
    re_path(r'^assets/products/(?P<path>.*)$', serve, {'document_root': settings.MEDIA_ROOT / 'products'}),
]

# Serve static files in development
if settings.DEBUG:
    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)

admin.site.site_header = "Jay Veer Enterprise Admin"
admin.site.site_title = "Jay Veer Enterprise Admin"
admin.site.index_title = "Jay Veer Enterprise Content & Product Management"
