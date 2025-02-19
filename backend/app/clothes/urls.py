from django.urls import path
from . import views

urlpatterns = [
    path("", views.ClothesList.as_view()),
    path("<int:pk>/", views.ClothesDetail.as_view()),
    path("create/", views.CreateClothesView.as_view()),
    path("delete/<int:pk>/", views.DeleteClothesView.as_view()),
    path("inactive/<int:pk>/", views.InactiveClothesView.as_view()),
    path("inactive/", views.InactiveClothesList.as_view()),
]
