from django.urls import include, path
from .views import FarmView, MovementView

# Wire up our API using automatic URL routing.
# Additionally, we include login URLs for the browsable API.
urlpatterns = [
    path('farm/', FarmView.as_view()),
    path('movement/', MovementView.as_view()),
]