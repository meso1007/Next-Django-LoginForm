from django.contrib.auth import authenticate
from django.contrib.auth.models import User
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.exceptions import AuthenticationFailed
from rest_framework.exceptions import ValidationError
from rest_framework_simplejwt.tokens import RefreshToken
from .serializers import UserRegisterSerializer

# User registration view
@api_view(['POST'])
def register_user(request):
    # Serialize and validate the request data
    serializer = UserRegisterSerializer(data=request.data)

    if serializer.is_valid():
        username = serializer.validated_data['username']
        email = serializer.validated_data['email']
        password = serializer.validated_data['password']

        # Check if the username already exists
        if User.objects.filter(username=username).exists():
            raise ValidationError('Username already exists')

        # Check if the email already exists
        if User.objects.filter(email=email).exists():
            raise ValidationError('Email already exists')

        # Create the user
        user = serializer.save()

        # Generate JWT tokens
        refresh = RefreshToken.for_user(user)
        access_token = str(refresh.access_token)

        return Response({
            "message": "Registration successful",
            "username": username,
            "access_token": access_token,
            "refresh_token": str(refresh),
        }, status=status.HTTP_201_CREATED)

    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# User login view
@api_view(['POST'])
def login_user(request):
    username = request.data.get('username')
    password = request.data.get('password')

    # Ensure both username and password are provided
    if not username or not password:
        raise AuthenticationFailed('Username and password are required.')

    # Authenticate the user
    user = authenticate(request, username=username, password=password)
    if user is not None:
        # Generate JWT tokens upon successful login
        refresh = RefreshToken.for_user(user)
        access_token = str(refresh.access_token)

        return Response({
            "message": "Login successful",
            "username": username,
            "access_token": access_token,
            "refresh_token": str(refresh),
        }, status=status.HTTP_200_OK)
    else:
        raise AuthenticationFailed('Invalid credentials')
