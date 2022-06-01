from django.db import models
from django.contrib.auth.models import User

class Listing(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    name = models.CharField(max_length=255)
    address = models.CharField(max_length=255)
    city = models.CharField(max_length=255) 
    state = models.CharField(max_length=25)
    zipcode = models.CharField(max_length=25)
    likes = models.IntegerField(default=0)
    dislikes = models.IntegerField(default=0)

class Review(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)  
    text = models.CharField(max_length=255)
    listing_id = models.IntegerField()


class Reply(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    comment = models.ForeignKey(Review, null= True, on_delete=models.CASCADE)
    text = models.CharField(max_length=255)

