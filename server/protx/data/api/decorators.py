from functools import wraps
from django.core.exceptions import PermissionDenied


def onboarded_required(function):
    """Decorator requires user to be logged in and onboarded.
    """

    @wraps(function)
    def wrapper(*args, **kwargs):
        request = args[0]
        if request.user.is_authenticated and request.user.profile.setup_complete:
            return function(*args, **kwargs)
        else:
            raise PermissionDenied

    return wrapper
