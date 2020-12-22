from django.views.decorators.csrf import ensure_csrf_cookie
from django.shortcuts import redirect, render
from django.contrib.auth.decorators import login_required


@login_required
@ensure_csrf_cookie
def data_map(request):
    return render(request, 'portal/apps/workbench/index.html')
