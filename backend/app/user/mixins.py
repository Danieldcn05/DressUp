from django.db.models import QuerySet, Q


class idUserFilterMixin:
    def filter_by_id_user(self, queryset: QuerySet) -> QuerySet:
        id_user = self.request.user.id

        return queryset.filter(id=id_user)
