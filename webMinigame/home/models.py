from django.db import models

# Create your models here.
class Result(models.Model):
    """
    Thằng Quốc An ngu top 1 server!
    """
    ten = models.CharField(default="", max_length=50)
    diem = models.DecimalField(max_digits=5, decimal_places=2, default=0.0)
    matkhau = models.CharField(default="", max_length=20)
    def __str__(self):
        return self.ten