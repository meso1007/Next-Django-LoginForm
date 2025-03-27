from django.urls import path
from .views import login_user
from .views import register_user

urlpatterns = [
    path('login/', login_user, name='login'),
    path('register/', register_user, name='register'),
]
