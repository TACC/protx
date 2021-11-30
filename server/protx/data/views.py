from django.views.decorators.csrf import ensure_csrf_cookie
from django.contrib.auth.decorators import login_required
from django.shortcuts import render


@ensure_csrf_cookie
@login_required
def data_map(request):
    return render(request, 'portal/apps/workbench/index.html',
                  {'setup_complete': request.user.profile.setup_complete})
