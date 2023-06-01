from django.urls import path
from rest_framework.urlpatterns import format_suffix_patterns

from toys import api

urlpatterns = [
    path('toys/', api.toys),
    path('orders/', api.orders)
]

urlpatterns = format_suffix_patterns(urlpatterns)
