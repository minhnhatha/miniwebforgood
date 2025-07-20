from django.shortcuts import render
import json
from home.models import *
# Create your views here.
def home(request):
    if request.method == "POST":
        data = json.loads(request.body)
        name = data.get('UserName')
        score = data.get('X')
        password = data.get('S')
        Result.objects.create(ten = name, diem = score, matkhau = password)
    return render(request, "home.html")
def lead_home(request):
    return render(request, "leader.html", {
        "board": Result.objects.order_by('-diem'),
    })