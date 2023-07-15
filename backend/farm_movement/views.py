from django.shortcuts import render
from django.db import transaction

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .serializers import FarmSerializer, MovementSerializer
from .models import Farm, Movement

# Create your views here.
class FarmView(APIView):
    def post(self, request):
        serializer = FarmSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({"status": "success", "data": serializer.data}, status=status.HTTP_200_OK)
        else:
            return Response({"status": "error", "data": serializer.errors}, status=status.HTTP_400_BAD_REQUEST)

    def get(self, request):
        if 'premise_id' in request.GET:
            try:
                item = Farm.objects.filter(premise_id=request.GET['premise_id'])
                serializer = FarmSerializer(item)
                return Response({"status": "success", "data": serializer.data}, status=status.HTTP_200_OK)
            except:
                return Response({"status": "error"}, status=status.HTTP_400_BAD_REQUEST)
        
        items = Farm.objects.all()
        if items:
            serializer = FarmSerializer(items, many=True)
            return Response({"status": "success", "data": serializer.data}, status=status.HTTP_200_OK)
        else:
            return Response({"status": "error", "data": "No data available"}, status=status.HTTP_400_BAD_REQUEST)

class MovementView(APIView):
    def post(self, request):
        serializer = MovementSerializer(data=request.data)

        if serializer.is_valid():
            
            origin_farm = request.data['origin_premise_id']
            dest_farm = request.data['dest_premise_id']
            moved = int(request.data['items_moved'])

            with transaction.atomic():

                to_update_origin_farm = Farm.objects.get(premise_id=origin_farm)
                to_update_dest_farm = Farm.objects.get(premise_id=dest_farm)
                to_update_origin_farm.total_population = to_update_origin_farm.total_population-moved
                to_update_dest_farm.total_population=to_update_dest_farm.total_population+moved
                to_update_origin_farm.save()
                to_update_dest_farm.save()
            
            serializer.save()
            return Response({"status": "success", "data": serializer.data}, status=status.HTTP_200_OK)
        else:
            return Response({"status": "error", "data": serializer.errors}, status=status.HTTP_400_BAD_REQUEST)

    def get(self, request):

        if 'movement_id' in request.GET:
            try:
                item = Movement.objects.get(movement_id=request.GET['movement_id'])
                serializer = MovementSerializer(item)
                return Response({"status": "success", "data": serializer.data}, status=status.HTTP_200_OK)
            except:
                return Response({"status": "error"}, status=status.HTTP_400_BAD_REQUEST)

        
        if 'premise_id' in request.GET:
            try:
                items = Movement.objects.filter(origin_premise_id=request.GET['premise_id'])
                print("*****",items)
                if items:
                    serializer = MovementSerializer(items, many=True)
                    return Response({"status": "success", "data": serializer.data}, status=status.HTTP_200_OK)
                else:
                    return Response({"status": "error", "data": "No data available"}, status=status.HTTP_400_BAD_REQUEST)
            except Exception:
                # return Response({"status": "error","data": "NO"}, status=status.HTTP_400_BAD_REQUEST)
                return Response(Exception)
        
        items = Movement.objects.all()
        if items:
            serializer = MovementSerializer(items, many=True)
            return Response({"status": "success", "data": serializer.data}, status=status.HTTP_200_OK)
        else:
            return Response({"status": "error", "data": "No data available"}, status=status.HTTP_400_BAD_REQUEST)