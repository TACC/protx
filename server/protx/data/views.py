from django.views.decorators.csrf import ensure_csrf_cookie
from django.shortcuts import render


@ensure_csrf_cookie
def data_map(request):
    return render(request, 'portal/apps/workbench/index.html')
