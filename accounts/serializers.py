from rest_framework import serializers
from django.contrib.auth import get_user_model
from .models import UserAccountManager

User = get_user_model()


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'email', 'name', 'is_active', 'is_staff')
        read_only_fields = ('id', 'is_active', 'is_staff')


class UserCreateSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)
    re_password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ('email', 'name', 'password', 're_password')

    def create(self, validated_data):
        validated_data.pop('re_password')
        return User.objects.create_user(**validated_data)


class UserAccountManagerSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserAccountManager
        fields = '__all__'
