from django.shortcuts import render
from myapi.serializers import HeroSerializer
from myapi.models import Hero

# Create your views here.

def index(request):
    hero_serializer = HeroSerializer()
    return render(request, "index.html",{"hero_serializer": hero_serializer})
