from django.shortcuts import render

from django.http import HttpResponse
from django.shortcuts import get_object_or_404
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

from .models import Brand,Model,Vehicletest,Vehicle
from .serializers import BrandSerializer,ModelSerializer,VehicletestSerializer,VehicleSerializer

from rest_framework import generics
from django.db.models import Q
from .permissions import IsOwnerOrReadOnly
# Create your views here.
class BrandList(APIView):
    def get(self,request):
        brand1 = Brand.objects.all()
        serializer = BrandSerializer(brand1, many=True)
        return Response(serializer.data)
    def post(self):
        pass
class ModelList(APIView):
    def get(self,request):
        model1 = Model.objects.all()
        serializer =  ModelSerializer(model1, many=True)
        return Response(serializer.data)
    def post(self):
        pass
class VehicleValueApiView(APIView):
    lookup_field = 'id'
    serializer_class = VehicleSerializer
    def get(self,request):
        queryset = Vehicle.objects.all()
        sample = []

        for key in queryset:
            # import ipdb; ipdb.set_trace()
            # print(key,"*****")
            dict = {"id":key.id,"model_name":key.model_name.model_name,"brand_name":key.brand_name.brand_name,"register_no":key.register_no,"value":key.value,"date":key.date}
            sample.append(dict)
        return Response(sample);
class VehicleAPIView(generics.ListCreateAPIView):
    lookup_field = 'id'
    queryset = Vehicle.objects.all()
    serializer_class = VehicleSerializer
    #permission_classes = []    #permissiion to make changes qithout authentication

    def get_queryset(self):
        qs =  Vehicle.objects.all()
        query = self.request.GET.get("q") #this is for searching
        if query is not None:
            qs = qs.filter(Q(register_no__icontains=query)|Q(value__icontains=query)).distinct()
        return qs
    # def perform_create(self, serializer):
    #     serializer.save(user=self.request.user)

class VehicleList(generics.RetrieveUpdateDestroyAPIView):
    lookup_field  = "id"
    serializer_class = VehicleSerializer
    # permission_classes = [IsOwnerOrReadOnly] #it is for make change only gor current user
    # queryset = Vehicle.objects.all()

    def get_queryset(self):
        return Vehicle.objects.all()

class Vehicletestlist(generics.RetrieveUpdateDestroyAPIView):
    lookup_field  = "id"
    serializer_class = VehicletestSerializer
    def get_queryset(self):
        return Vehicle.objects.all()

    # def get(self,request):
    #     vehicle1 = Vehicletest.objects.all()
    #     serializer = VehicletestSerializer(vehicle1, many=True)
    #     return Response(serializer.data)
    # def post(self):
    #     pass
