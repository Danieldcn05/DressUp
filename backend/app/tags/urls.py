from django.urls import path
from . import views

urlpatterns = [
    path("", views.TagsList.as_view()),
    path("<int:pk>/", views.TagsDetail.as_view()),
    path("create/", views.CreateTagView.as_view()),
    path("delete/<int:pk>/", views.DeleteTagView.as_view()),
]
