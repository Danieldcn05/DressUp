from django.urls import path
from . import views

urlpatterns = [
    path("", views.OutfitList.as_view()),
    path("<int:pk>/", views.OutfitDetail.as_view()),
    path("create/", views.CreateOutfitView.as_view()),
    path("delete/<int:pk>/", views.DeleteOutfitView.as_view()),
]
