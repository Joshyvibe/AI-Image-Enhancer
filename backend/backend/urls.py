
from django.contrib import admin
from api.views import ImageRestoreView
from django.conf import settings
from django.conf.urls.static import static
from django.urls import path, re_path
from django.views.static import serve 

urlpatterns = [
    path('admin/', admin.site.urls),
    path('restore-image/', ImageRestoreView.as_view(), name='restore_image'),
    re_path(r'^media/(?P<path>.*)$', serve, {'document_root': settings.MEDIA_ROOT}),
]




urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

