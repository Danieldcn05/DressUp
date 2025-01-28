from django.urls import path
from . import views

urlpatterns = [
    path("", views.UserList.as_view()),
    path("<int:pk>/", views.UserDetail.as_view()),
    path("register/", views.RegisterUser.as_view()),
    path("me/", views.UserDetailMe.as_view()),
    path("delete/<int:pk>/", views.DeleteUser.as_view()),
]
