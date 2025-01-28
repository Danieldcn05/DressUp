from django.urls import path
from . import views

urlpatterns = [
    path("", views.OutfitPlannerList.as_view()),
    path("<int:pk>/", views.OutfitPlannerDetail.as_view()),
    path("create/", views.CreateOutfitPlannerView.as_view()),
    path("delete/<int:pk>/", views.DeleteOutfitPlannerView.as_view()),
]
