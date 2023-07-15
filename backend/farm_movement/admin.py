from django.contrib import admin

# Register your models here.
from .models import Farm, Movement

admin.site.register(Farm)
admin.site.register(Movement)