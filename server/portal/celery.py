
import os
from celery import Celery
from celery.schedules import crontab
from django.conf import settings

# set the default Django settings module for the 'celery' program.
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'portal.settings.settings')

app = Celery('portal')

# Using a string here means the worker don't have to serialize
# the configuration object to child processes.
# - namespace='CELERY' means all celery-related configuration keys
#   should have a `CELERY_` prefix.
app.config_from_object('django.conf:settings', namespace='CELERY')

# Load task modules from all registered Django app configs.
app.autodiscover_tasks()

app.conf.beat_schedule = {
    # TODO: REENABLE INDEXERS
    # 'index_community_data': {
    #    'task': 'portal.apps.search.tasks.index_community_data',
    #    'schedule': crontab(hour="2", minute=0),
    # },
    # 'index_my_data': {
    #    'task': 'portal.apps.search.tasks.index_my_data',
    #    'schedule': crontab(hour="3", minute=0),
    # },
    # 'index_cms': {
    #     'task': 'portal.apps.search.tasks.index_cms',
    #     'schedule': crontab(hour="4", minute=0)
    # }
}

if settings.COMMUNITY_INDEX_SCHEDULE:
    app.conf.beat_schedule['index_community'] = {
        'task': 'portal.apps.search.tasks.index_community_data',
        'schedule': crontab(**settings.COMMUNITY_INDEX_SCHEDULE)
    }


@app.task(bind=True)
def debug_task(self):
    print(('Request: {0!r}'.format(self.request)))
