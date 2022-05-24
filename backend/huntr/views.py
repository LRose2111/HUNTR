from http import server
from django.shortcuts import get_object_or_404
from rest_framework import status
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.decorators import permission_classes, api_view
from .models import Listing, Review
from .serializers import ListingSerializer, ReviewSerializer




@api_view(["GET", "POST"])
@permission_classes([IsAuthenticated])
def ListingActions(request):
    if request.method == "GET":
        listing = Listing.objects.all()
        serializer = ListingSerializer(listing, many=True)
        return Response(serializer.data)
    elif request.method == "POST":
        serializer = ListingSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(["GET", "POST"])
@permission_classes([IsAuthenticated])
def ReviewActions(request, id):
    if request.method == "GET":
        review = Review.objects.filter(listing_id = id)
        serializer = ReviewSerializer(review, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    elif request.method == "POST":
        serializer = ReviewSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(user=request.user, listing_id = id)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)