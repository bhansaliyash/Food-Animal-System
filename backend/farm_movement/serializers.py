from rest_framework import serializers

from .models import Farm, Movement

class FarmSerializer(serializers.ModelSerializer):
    class Meta:
        model = Farm
        fields = ('__all__')


class MovementSerializer(serializers.ModelSerializer):
    class Meta:
        model = Movement
        fields = ('__all__')