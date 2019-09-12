"""
Django settings for portal project.

Generated by 'django-admin startproject' using Django 2.2.5.

For more information on this file, see
https://docs.djangoproject.com/en/2.2/topics/settings/

For the full list of settings and their values, see
https://docs.djangoproject.com/en/2.2/ref/settings/
"""

import os
import logging
from kombu import Exchange, Queue
from portal.settings import settings_secret

# pylint: disable=protected-access
# pylint: disable=invalid-name
logger = logging.getLogger(__file__)
gettext = lambda s: s  # noqa:E731
# pylint: enable=invalid-name

# Build paths inside the project like this: os.path.join(BASE_DIR, ...)
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
FIXTURE_DIRS = [
    os.path.join(BASE_DIR, 'fixtures'),
]

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = settings_secret._SECRET_KEY
# SECURITY WARNING: don't run with debug turned on in production!
# Cookie name. this can be whatever you want
SESSION_COOKIE_NAME = 'sessionid'  # use the sessionid in your views code
# the module to store sessions data
SESSION_ENGINE = 'django.contrib.sessions.backends.db'
# age of cookie in seconds (default: 2 weeks)
SESSION_COOKIE_AGE = 24*60*60*7  # the number of seconds for only 7 for example
# whether a user's session cookie expires when the web browser is closed
SESSION_EXPIRE_AT_BROWSER_CLOSE = False
# whether the session cookie should be secure (https:// only)
SESSION_COOKIE_SECURE = True

SECURE_PROXY_SSL_HEADER = ('HTTP_X_FORWARDED_PROTO', 'https')
ALLOWED_HOSTS = ['*']

# Custom Portal Template Assets
PORTAL_ICON_FILENAME=settings_secret._PORTAL_ICON_FILENAME
PORTAL_LOGO_FILENAME=settings_secret._PORTAL_LOGO_FILENAME
PORTAL_NAVBAR_BACKGROUND_FILENAME=settings_secret._PORTAL_NAVBAR_BACKGROUND_FILENAME

ROOT_URLCONF = 'portal.urls'

# Application definition

INSTALLED_APPS = [
    # Core Django.
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',

    'django.contrib.sites',
    'django.contrib.sitemaps',
    'django.contrib.sessions.middleware',

    # Django recaptcha.
    'captcha',

    # Pipeline.
    'easy_thumbnails',
    'filer',
    'mptt',
    'bootstrap4',
    'termsandconditions',

    # Websockets.
    'ws4redis',

    # Custom apps.
    'portal.apps.accounts',
    'portal.apps.auth',

    # Wagtail CMS
    'wagtail.contrib.forms',
    'wagtail.contrib.redirects',
    'wagtail.embeds',
    'wagtail.sites',
    'wagtail.users',
    'wagtail.snippets',
    'wagtail.documents',
    'wagtail.images',
    'wagtail.search',
    'wagtail.admin',
    'wagtail.core',
    'modelcluster',
    'taggit',
]

MIDDLEWARE = [
    # Django core middleware.
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',

    'portal.apps.auth.middleware.AgaveTokenRefreshMiddleware',   # Custom Portal Auth Check.
    'django.middleware.locale.LocaleMiddleware',

    # Throws an Error.
    # 'portal.middleware.PortalTermsMiddleware',

    # Wagtail CMS
    'wagtail.core.middleware.SiteMiddleware',
    'wagtail.contrib.redirects.middleware.RedirectMiddleware',
]

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [os.path.join(BASE_DIR, 'templates')],
        # 'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                # Django core processors
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',

                # what are these for?
                'django.template.context_processors.i18n',
                'django.template.context_processors.media',
                'django.template.context_processors.csrf',   # Needed?
                'django.template.context_processors.tz',
                'django.template.context_processors.static',
                'django_settings_export.settings_export',
                'ws4redis.context_processors.default',
                'portal.utils.contextprocessors.analytics',
                'portal.utils.contextprocessors.debug',
                'portal.utils.contextprocessors.messages',
            ],
            'loaders': [
                'django.template.loaders.filesystem.Loader',
                'django.template.loaders.app_directories.Loader',
            ],
        },
    },
]

WSGI_APPLICATION = settings_secret._WSGI_APPLICATION

AUTHENTICATION_BACKENDS = ['portal.apps.auth.backends.AgaveOAuthBackend',
                           'django.contrib.auth.backends.ModelBackend']

# Password validation
# https://docs.djangoproject.com/en/2.2/ref/settings/#auth-password-validators

AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': ('django.contrib.auth.password_validation.'
                 'UserAttributeSimilarityValidator'),
    },
    {
        'NAME': ('django.contrib.auth.password_validation.'
                 'MinimumLengthValidator'),
    },
    {
        'NAME': ('django.contrib.auth.password_validation.'
                 'CommonPasswordValidator'),
    },
    {
        'NAME': ('django.contrib.auth.password_validation.'
                 'NumericPasswordValidator'),
    },
]

IMPERSONATE_REQUIRE_SUPERUSER = True

LOGIN_REDIRECT_URL = getattr(settings_secret, '_LOGIN_REDIRECT_URL', '/')

# Internationalization
# https://docs.djangoproject.com/en/2.2/topics/i18n/

LANGUAGE_CODE = 'en-us'
TIME_ZONE = 'UTC'
USE_I18N = True
USE_L10N = True
USE_TZ = True

# LANGUAGES = [
#     ('en-us', 'US English')
# ]

LANGUAGES = (
    ## Customize this
    ('en', gettext('en')),
)

# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/2.2/howto/static-files/

STATIC_URL = '/static/'
MEDIA_URL = '/media/'

STATIC_ROOT = os.path.join(BASE_DIR, '../static')
MEDIA_ROOT = os.path.join(BASE_DIR, '../media')

STATICFILES_DIRS = [
    # os.path.join(BASE_DIR, '../../', 'client'),
    ('build', os.path.join(BASE_DIR, '../../client/build')),
    ('css', os.path.join(BASE_DIR, '../../client/css')),
    ('img', os.path.join(BASE_DIR, '../../client/img')),
    ('src', os.path.join(BASE_DIR, '../../client/src')),
    ('node_modules/bootstrap', os.path.join(BASE_DIR, '../../client/node_modules/bootstrap')),
]

STATICFILES_FINDERS = [
    'django.contrib.staticfiles.finders.FileSystemFinder',
    'django.contrib.staticfiles.finders.AppDirectoriesFinder',
]

FIXTURE_DIRS = [
    os.path.join(BASE_DIR, 'fixtures'),
]

"""
SETTINGS: LOCAL
"""

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
DEBUG = settings_secret._DEBUG

# Database
# https://docs.djangoproject.com/en/2.2/ref/settings/#databases

DATABASES = {
    'default': {
        'ENGINE': settings_secret._DJANGO_DB_ENGINE,
        'NAME': settings_secret._DJANGO_DB_NAME,
        'USER': settings_secret._DJANGO_DB_USER,
        'PASSWORD': settings_secret._DJANGO_DB_PASSWORD,
        'HOST': settings_secret._DJANGO_DB_HOST,
        'PORT': settings_secret._DJANGO_DB_PORT
    }
}

WS4REDIS_CONNECTION = {
    'host': settings_secret._RESULT_BACKEND_HOST,
}
WEBSOCKET_URL = '/ws/'

# TAS Authentication.
TAS_URL = settings_secret._TAS_URL
TAS_CLIENT_KEY = settings_secret._TAS_CLIENT_KEY
TAS_CLIENT_SECRET = settings_secret._TAS_CLIENT_SECRET

REQUEST_ACCESS = getattr(settings_secret, "_REQUEST_ACCESS", True)

# Redmine Tracker Authentication.
RT_HOST = settings_secret._RT_HOST
RT_UN = settings_secret._RT_UN
RT_PW = settings_secret._RT_PW
RT_QUEUE = settings_secret._RT_QUEUE
RT_TAG = getattr(settings_secret, '_RT_TAG', "")

# Recaptcha Authentication.
RECAPTCHA_PUBLIC_KEY = settings_secret._RECAPTCHA_PUBLIC_KEY
RECAPTCHA_PRIVATE_KEY = settings_secret._RECAPTCHA_PRIVATE_KEY
RECAPTCHA_USE_SSL = settings_secret._RECAPTCHA_USE_SSL

# Google Analytics.
GOOGLE_ANALYTICS_PROPERTY_ID = settings_secret._GOOGLE_ANALYTICS_PROPERTY_ID
GOOGLE_ANALYTICS_PRELOAD = settings_secret._GOOGLE_ANALYTICS_PRELOAD

"""
SETTINGS: LOGGING
"""

LOGGING = {
    'version': 1,
    'disable_existing_loggers': False,
    'formatters': {
        'default': {
            'format': '[DJANGO] %(levelname)s %(asctime)s %(module)s '
                      '%(name)s.%(funcName)s:%(lineno)s: %(message)s'
        },
        'agave': {
            'format': '[AGAVE] %(levelname)s %(asctime)s %(module)s '
                      '%(name)s.%(funcName)s:%(lineno)s: %(message)s'
        },
        'metrics': {
            'format': '[METRICS] %(levelname)s %(module)s %(name)s.'
                      '%(funcName)s:%(lineno)s: %(message)s '
                      'user=%(user)s sessionId=%(sessionId)s '
                      'op=%(operation)s info=%(info)s'
        },
    },
    'handlers': {
        'console': {
            'level': 'DEBUG',
            'class': 'logging.StreamHandler',
            'formatter': 'default',
        },
        'file': {
            'level': 'DEBUG',
            'class': 'logging.handlers.RotatingFileHandler',
            'filename': '/var/log/portal/portal.log',
            'maxBytes': 1024*1024*5,  # 5 MB
            'backupCount': 5,
            'formatter': 'default',
        },
        'metrics_console': {
            'level': 'INFO',
            'class': 'logging.StreamHandler',
            'formatter': 'metrics',
        },
        'metrics_file': {
            'level': 'DEBUG',
            'class': 'logging.handlers.RotatingFileHandler',
            'filename': '/var/log/portal/metrics.log',
            'maxBytes': 1024*1024*5,  # 5 MB
            'backupCount': 5,
            'formatter': 'metrics',
        },
    },
    'loggers': {
        'django': {
            'handlers': ['console', 'file'],
            'level': 'INFO',
            'propagate': True,
        },
        'portal': {
            'handlers': ['console', 'file'],
            'level': 'DEBUG',
        },
        'metrics': {
            'handlers': ['metrics_console', 'metrics_file'],
            'level': 'INFO',
        },
        'paramiko': {
            'handlers': ['console'],
            'level': 'DEBUG'
        }
    },
}

"""
SETTINGS: AGAVE
"""

# Agave Tenant.
AGAVE_TENANT_ID = settings_secret._AGAVE_TENANT_ID
AGAVE_TENANT_BASEURL = settings_secret._AGAVE_TENANT_BASEURL

# Agave Client Configuration
AGAVE_CLIENT_KEY = settings_secret._AGAVE_CLIENT_KEY
AGAVE_CLIENT_SECRET = settings_secret._AGAVE_CLIENT_SECRET
AGAVE_SUPER_TOKEN = settings_secret._AGAVE_SUPER_TOKEN
AGAVE_STORAGE_SYSTEM = settings_secret._AGAVE_STORAGE_SYSTEM
AGAVE_COMMUNITY_DATA_SYSTEM = settings_secret._AGAVE_COMMUNITY_DATA_SYSTEM
AGAVE_PUBLIC_DATA_SYSTEM = settings_secret._AGAVE_PUBLIC_DATA_SYSTEM

PORTAL_ADMIN_USERNAME = settings_secret._PORTAL_ADMIN_USERNAME

AGAVE_JWT_PUBKEY = (
    'MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCUp/oV1vWc8/TkQSiAvTousMzO\n'
    'M4asB2iltr2QKozni5aVFu818MpOLZIr8LMnTzWllJvvaA5RAAdpbECb+48FjbBe\n'
    '0hseUdN5HpwvnH/DW8ZccGvk53I6Orq7hLCv1ZHtuOCokghz/ATrhyPq+QktMfXn\n'
    'RS4HrKGJTzxaCcU7OQIDAQAB'
)
AGAVE_JWT_HEADER = settings_secret._AGAVE_JWT_HEADER
AGAVE_JWT_ISSUER = 'wso2.org/products/am'
AGAVE_JWT_USER_CLAIM_FIELD = 'http://wso2.org/claims/fullname'

"""
SETTINGS: DJANGO CMS
"""

SITE_ID = settings_secret._SITE_ID
FILER_DEBUG = True
FILER_ENABLE_LOGGING = True
DJANGOCMS_FORMS_WIDGET_CSS_CLASSES = {'__all__': ('form-control', ) }

CMS_LANGUAGES = {
    ## Customize this
    'default': {
        'public': True,
        'hide_untranslated': False,
        'redirect_on_fallback': True,
    },
    1: [
        {
            'public': True,
            'code': 'en',
            'hide_untranslated': False,
            'name': gettext('en-us'),  # 'en'
            'redirect_on_fallback': True,
        },
    ],
}

CMS_TEMPLATES = (
    ('cms_page.html', 'Main Site Page'),
)

CMS_PERMISSION = True

CMS_PLACEHOLDER_CONF = {}

CMSPLUGIN_CASCADE_PLUGINS = ['cmsplugin_cascade.bootstrap3']
CMSPLUGIN_CASCADE_PLUGINS.append('cmsplugin_cascade.link')
SELECT2_CSS = 'node_modules/select2/dist/css/select2.min.css'  # PATH?
SELECT2_JS = 'node_modules/select2/dist/js/select2.min.js'     # PATH?


CMSPLUGIN_FILER_IMAGE_STYLE_CHOICES = (
    ('default', 'Default'),
)
CMSPLUGIN_FILER_IMAGE_DEFAULT_STYLE = 'default'

# These settings enable iFrames in the CMS cktext-editor.
TEXT_ADDITIONAL_TAGS = ('iframe',)
TEXT_ADDITIONAL_ATTRIBUTES = ('scrolling', 'allowfullscreen', 'frameborder', 'src', 'height', 'width')

TEXT_SAVE_IMAGE_FUNCTION='cmsplugin_filer_image.integrations.ckeditor.create_image_plugin'

THUMBNAIL_HIGH_RESOLUTION = True

THUMBNAIL_PROCESSORS = (
    'easy_thumbnails.processors.colorspace',
    'easy_thumbnails.processors.autocrop',
    'filer.thumbnail_processors.scale_and_crop_with_subject_location',
    'easy_thumbnails.processors.filters',
    'easy_thumbnails.processors.background'
)

# CKEDITOR_SETTINGS = {
#     'language': '{{ language }}',
#     'toolbar_CMS': [
#         ['Undo', 'Redo'],
#         ['cmsplugins', '-', 'ShowBlocks'],
#         ['Format', 'Styles'],
#     ],
#     'skin': 'moono-lisa',
#     'contentsCss': [
#         'https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css',
#         # '/css/mysitestyles.css',
#     ],
# }

CKEDITOR_SETTINGS = {
    'language': '{{ language }}',
    'skin': 'moono-lisa',
    'toolbar': 'CMS',
}

# CMS Forms.
ALDRYN_BOILERPLATE_NAME='bootstrap3'

DJANGOCMS_FORMS_RECAPTCHA_PUBLIC_KEY = RECAPTCHA_PUBLIC_KEY
DJANGOCMS_FORMS_RECAPTCHA_SECRET_KEY = RECAPTCHA_PRIVATE_KEY
# DJANGOCMS_FORMS_PLUGIN_MODULE = _('Generic')
# DJANGOCMS_FORMS_PLUGIN_NAME = _('Form')
# DJANGOCMS_FORMS_DEFAULT_TEMPLATE = 'djangocms_forms/form_template/default.html'  # Path?
# DJANGOCMS_FORMS_TEMPLATES = (
#     ('djangocms_forms/form_template/default.html', _('Default')),
# )
# DJANGOCMS_FORMS_USE_HTML5_REQUIRED = False
# DJANGOCMS_FORMS_WIDGET_CSS_CLASSES = {'__all__': ('form-control', ) }
# DJANGOCMS_FORMS_REDIRECT_DELAY = 10000  # 10 seconds. Default is 1 second.
# instance.redirect_delay > DJANGOCMS_FORMS_REDIRECT_DELAY > 1000 (default)  # per form delay.

# Media Plugins.
DJANGOCMS_AUDIO_ALLOWED_EXTENSIONS = ['mp3', 'ogg', 'wav']
# DJANGOCMS_AUDIO_TEMPLATES = [
#     # ('default', _('Default Version')),
#     ('feature', _('Featured Version')),
# ]

#DJANGOCMS_EMBED_API_KEY = ""    # Requires an embed.ly account to use.

DJANGOCMS_VIDEO_ALLOWED_EXTENSIONS = ['mp4', 'webm', 'ogv']
# DJANGOCMS_VIDEO_TEMPLATES = [
#     ('feature', _('Featured Version')),
# ]
# Requires registering portal app on youtube: https://developers.google.com/youtube/registering_an_application
# DJANGOCMS_YOUTUBE_API_KEY = '<youtube_data_api_server_key>'


"""
SETTINGS: WAGTAIL
"""
WAGTAIL_SITE_NAME = settings_secret._WAGTAIL_SITE_NAME


"""
SETTINGS: CELERY
"""

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

_BROKER_URL_PROTOCOL = 'amqp://'
_BROKER_URL_USERNAME = settings_secret._BROKER_URL_USERNAME
_BROKER_URL_PWD = settings_secret._BROKER_URL_PWD
_BROKER_URL_HOST = settings_secret._BROKER_URL_HOST
_BROKER_URL_PORT = settings_secret._BROKER_URL_PORT
_BROKER_URL_VHOST = settings_secret._BROKER_URL_VHOST

CELERY_BROKER_URL = ''.join(
    [
        _BROKER_URL_PROTOCOL, _BROKER_URL_USERNAME, ':',
        _BROKER_URL_PWD, '@', _BROKER_URL_HOST, ':',
        _BROKER_URL_PORT, '/', _BROKER_URL_VHOST
    ]
)

_RESULT_BACKEND_PROTOCOL = 'redis://'
_RESULT_BACKEND_USERNAME = settings_secret._RESULT_BACKEND_USERNAME
_RESULT_BACKEND_PWD = settings_secret._RESULT_BACKEND_PWD
_RESULT_BACKEND_HOST = settings_secret._RESULT_BACKEND_HOST
_RESULT_BACKEND_PORT = settings_secret._RESULT_BACKEND_PORT
_RESULT_BACKEND_DB = settings_secret._RESULT_BACKEND_DB

CELERY_RESULT_BACKEND = ''.join(
    [
        _RESULT_BACKEND_PROTOCOL,
        _RESULT_BACKEND_HOST, ':', _RESULT_BACKEND_PORT,
        '/', _RESULT_BACKEND_DB
    ]
)

CELERY_ACCEPT_CONTENT = ['json']
CELERY_TASK_SERIALIZER = 'json'
CELERY_RESULT_SERIALIZER = 'json'
CELERYD_HIJACK_ROOT_LOGGER = False
CELERYD_LOG_FORMAT = ('[DJANGO] $(processName)s %(levelname)s %(asctime)s '
                      '%(module)s %(name)s.%(funcName)s:%(lineno)s: '
                      '%(message)s')

CELERY_DEFAULT_EXCHANGE_TYPE = 'direct'
CELERY_QUEUES = (
    Queue(
        'default',
        Exchange('default'),
        routing_key='default',
        queue_arguments={
            'x-max-priority': 10
        }
    ),
    # Use to queue indexing tasks
    Queue(
        'indexing',
        Exchange('indexing'),
        routing_key='indexing',
        queue_arguments={
            'x-max-priority': 10
        }
    ),
    # Use to queue tasks which handle files
    Queue(
        'files',
        Exchange('files'),
        routing_key='files',
        queue_arguments={
            'x-max-priority': 10
        }
    ),
    # Use to queue tasks which mainly call external APIs
    Queue(
        'api',
        Exchange('api'),
        routing_key='api',
        queue_arguments={
            'x-max-priority': 10
        }
    ),
    # Use to queue tasks handling onboarding
    Queue(
        'onboard',
        Exchange('onboard'),
        routing_key='onboard',
        queue_arguments={
            'x-max-priority': 10
        }
    ),
    )
CELERY_TASK_DEFAULT_QUEUE = 'default'
CELERY_TASK_DEFAULT_EXCHANGE = 'default'
CELERY_TASK_DEFAULT_ROUTING_KEY = 'default'

"""
SETTINGS: DATA DEPOT
"""

PORTAL_DATA_DEPOT_MANAGERS = {
    'my-data': 'portal.apps.data_depot.managers.private_data.FileManager',
    'shared': 'portal.apps.data_depot.managers.shared.FileManager',
    'my-projects': 'portal.apps.data_depot.managers.projects.FileManager',
    'public': 'portal.apps.data_depot.managers.public.FileManager',
    'google-drive': 'portal.apps.data_depot.managers.google_drive.FileManager'
}

PORTAL_SEARCH_MANAGERS = {
    'my-data': 'portal.apps.search.api.managers.private_data_search.PrivateDataSearchManager',
    'shared': 'portal.apps.search.api.managers.shared_search.SharedSearchManager',
    'cms': 'portal.apps.search.api.managers.cms_search.CMSSearchManager',
    'my-projects': 'portal.apps.search.api.managers.private_data_search.PrivateDataSearchManager',
    'public': 'portal.apps.search.api.managers.public_search.PublicSearchManager' 
}

PORTAL_DATA_DEPOT_PAGE_SIZE = 100

"""
SETTINGS: EXTERNAL DATA RESOURCES
"""

EXTERNAL_RESOURCE_SECRETS = getattr(settings_secret, '_EXTERNAL_RESOURCE_SECRETS', {})


PORTAL_WORKSPACE_MANAGERS = {
    'private': 'portal.apps.workspace.managers.private.FileManager',
    'shared': 'portal.apps.workspace.managers.shared.FileManager',
}
PORTAL_WORKSPACE_PAGE_SIZE = 100

TOOLBAR_OPTIONS = {
    'trash_enabled': True,
    'share_enabled': True,
    'preview_enabled': True,
    'preview_images_enabled': True,
    'copy_enabled': True,
    'move_enabled': True,
    'rename_enabled': True,
    'tag_enabled': True,
}

AGAVE_DEFAULT_TRASH_NAME = '.Trash'

PORTAL_DATA_DEPOT_USER_SYSTEM_PREFIX = settings_secret.\
    _PORTAL_DATA_DEPOT_USER_SYSTEM_PREFIX

PORTAL_DATA_DEPOT_DEFAULT_HOME_DIR_ABS_PATH = settings_secret.\
    _PORTAL_DATA_DEPOT_DEFAULT_HOME_DIR_ABS_PATH

PORTAL_DATA_DEPOT_DEFAULT_HOME_DIR_REL_PATH = settings_secret.\
    _PORTAL_DATA_DEPOT_DEFAULT_HOME_DIR_REL_PATH

PORTAL_DATA_DEPOT_STORAGE_HOST = settings_secret.\
    _PORTAL_DATA_DEPOT_STORAGE_HOST

PORTAL_DATA_DEPOT_PROJECTS_SYSTEM_PREFIX = settings_secret.\
    _PORTAL_DATA_DEPOT_PROJECTS_SYSTEM_PREFIX

PORTAL_PROJECTS_NAME_PREFIX = settings_secret.\
    _PORTAL_PROJECTS_NAME_PREFIX

PORTAL_PROJECTS_ID_PREFIX = settings_secret.\
    _PORTAL_PROJECTS_ID_PREFIX

PORTAL_PROJECTS_ROOT_DIR = settings_secret.\
    _PORTAL_PROJECTS_ROOT_DIR

PORTAL_PROJECTS_ROOT_SYSTEM_NAME = settings_secret.\
    _PORTAL_PROJECTS_ROOT_SYSTEM_NAME

PORTAL_PROJECTS_ROOT_HOST = settings_secret.\
    _PORTAL_PROJECTS_ROOT_HOST

PORTAL_PROJECTS_PRIVATE_KEY = settings_secret.\
    _PORTAL_PROJECTS_PRIVATE_KEY

PORTAL_PROJECTS_PUBLIC_KEY = settings_secret.\
    _PORTAL_PROJECTS_PUBLIC_KEY

COMMUNITY_INDEX_SCHEDULE = settings_secret.\
    _COMMUNITY_INDEX_SCHEDULE

# This setting is not used directly most of the time.
# We mainly use it when creating the execution system for the pems app
# but that might not happen in every portal.
# We are only keeping this in the setting to have written down somewhere
# so we can refer to this line when looking for this system's ID.
# Also, it might be useful in the future when we need to do any changes
# to this system or setup any management commands.
PORTAL_PROJECTS_FS_EXEC_SYSTEM_ID = settings_secret.\
    _PORTAL_PROJECTS_FS_EXEC_SYSTEM_ID

PORTAL_PROJECTS_PEMS_APP_ID = settings_secret.\
    _PORTAL_PROJECTS_PEMS_APP_ID

PORTAL_USER_HOME_MANAGER = settings_secret.\
    _PORTAL_USER_HOME_MANAGER

PORTAL_KEYS_MANAGER = settings_secret.\
    _PORTAL_KEYS_MANAGER

PORTAL_USER_ACCOUNT_SETUP_STEPS = settings_secret.\
    _PORTAL_USER_ACCOUNT_SETUP_STEPS

PORTAL_USER_ACCOUNT_SETUP_WEBHOOK_PWD = settings_secret.\
    _PORTAL_USER_ACCOUNT_SETUP_WEBHOOK_PWD

PORTAL_NAMESPACE = settings_secret.\
    _PORTAL_NAMESPACE

PORTAL_PROJECTS_SYSTEM_PORT = getattr(settings_secret, '_PORTAL_PROJECTS_SYSTEM_PORT', 22)

PORTAL_DATA_DEPOT_WORK_HOME_DIR_FS = settings_secret.\
    _PORTAL_DATA_DEPOT_WORK_HOME_DIR_FS

PORTAL_DATA_DEPOT_WORK_HOME_DIR_EXEC_SYSTEM = settings_secret.\
    _PORTAL_DATA_DEPOT_WORK_HOME_DIR_EXEC_SYSTEM

PORTAL_APPS_METADATA_NAMES = settings_secret._PORTAL_APPS_METADATA_NAMES

# "View in Jupyter Notebook" base URL
PORTAL_JUPYTER_URL = getattr(settings_secret, '_PORTAL_JUPYTER_URL', None)
# "View in Jupyter Notebook" mount map, i.e. "data-sd2e-community" -> "/sd2e-community" for SD2E
PORTAL_JUPYTER_SYSTEM_MAP = getattr(settings_secret, '_PORTAL_JUPYTER_SYSTEM_MAP', None)

WH_BASE_URL = getattr(settings_secret, '_WH_BASE_URL', '')

PORTAL_DOMAIN = settings_secret._PORTAL_DOMAIN

PORTAL_ALLOCATION = getattr(settings_secret, '_PORTAL_ALLOCATION', '')

ALLOCATION_SYSTEMS = getattr(settings_secret, '_ALLOCATION_SYSTEMS', [])

"""
SETTINGS: settings related to possible steps in PORTAL_USER_ACCOUNT_SETUP_STEPS
"""
# ProjectMembershipStep
REQUIRED_PROJECTS = getattr(settings_secret, '_REQUIRED_PROJECTS', [])

"""
SETTINGS: ELASTICSEARCH
"""

ES_HOSTS = settings_secret._ES_HOSTS
ES_DEFAULT_INDEX = "files"
ES_DEFAULT_INDEX_ALIAS = "default"
ES_REINDEX_INDEX_ALIAS = "reindex"

ES_DEFAULT_PROJECT_INDEX = "projects"
ES_DEFAULT_PROJECT_INDEX_ALIAS = "projects-default"
ES_REINDEX_PROJECT_INDEX_ALIAS = "projects-reindex"

ES_PUBLIC_INDEX = "publications"
ES_PUBLIC_INDEX_ALIAS = "public"
ES_FILES_DOC_TYPE = "files"
ES_PROJECTS_DOC_TYPE = "projects"
ES_PUBLICATIONS_INDEX = "publications"
ES_METADATA_DOC_TYPE = "metadata"
ES_CMS_INDEX = "cms"

HAYSTACK_CONNECTIONS = settings_secret._HAYSTACK_CONNECTIONS
HAYSTACK_ROUTERS = ['aldryn_search.router.LanguageRouter', ]

ALDRYN_SEARCH_DEFAULT_LANGUAGE = 'en'
ALDRYN_SEARCH_REGISTER_APPHOOK = True

"""
SETTINGS: EXPORTS
"""

SETTINGS_EXPORT = [
    'PORTAL_ICON_FILENAME',
    'PORTAL_LOGO_FILENAME',
    'PORTAL_NAVBAR_BACKGROUND_FILENAME',
    'DEBUG',
    'GOOGLE_ANALYTICS_PRELOAD',
    'GOOGLE_ANALYTICS_PROPERTY_ID',
    'PORTAL_NAMESPACE'
]
