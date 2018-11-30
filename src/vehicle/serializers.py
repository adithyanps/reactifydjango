from rest_framework import serializers
from .models import Brand,Model,Vehicletest,Vehicle

class BrandSerializer(serializers.ModelSerializer):
    class Meta:
        model = Brand
        fields = ['id','brand_name']
        # fields = '__all__'
class ModelSerializer(serializers.ModelSerializer):
    class Meta:
        model = Model
        fields = ['id','brand_name','model_name']
        # fields = '__all__'
class VehicleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Vehicle
        fields = [
        'id',
        'model_name',
        'brand_name',
        'register_no',
        'value',
        'date',
        ]
        read_only_fields = ['user']

    def validate_title(self, value):
        qs = Vehicle.objects.filter(register_no__iexact=value)
        if self.instance:
            qs = qs.exclude(id = self.instance.id)
        if qs.exists():
            raise serializers.ValidationError("id must unique")
        return value
class VehicletestSerializer(serializers.ModelSerializer):
    class Meta:
        model = Vehicletest
        fields = ['id','register_no','value','date']
