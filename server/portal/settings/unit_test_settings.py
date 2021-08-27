"""
Django settings for portal project.

Generated by 'django-admin startproject' using Django 1.10.5.

For more information on this file, see
https://docs.djangoproject.com/en/1.10/topics/settings/

For the full list of settings and their values, see
https://docs.djangoproject.com/en/1.10/ref/settings/
"""

import os


def gettext(s): return s


# Build paths inside the project like this: os.path.join(BASE_DIR, ...)
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

# Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/1.10/howto/deployment/checklist/

SITE_ID = 1
# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = '__CHANGE_ME!__'
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
SESSION_COOKIE_SECURE = False

ALLOWED_HOSTS = ['*']

# Custom Portal Template Assets
PORTAL_ICON_FILENAME = 'path/to/icon.ico'
PORTAL_DOMAIN = 'test.portal'
PORTAL_ADMIN_USERNAME = 'wma_prtl'

# Application definition

ROOT_URLCONF = 'portal.urls'


INSTALLED_APPS = [

    # Core Django.
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',

    'django.contrib.sitemaps',
    'django.contrib.sessions.middleware',

    # Django Channels
    'channels',

    # Pipeline.
    'bootstrap4',
    'termsandconditions',
    'impersonate',

    # Custom apps.
    'portal.apps.accounts',
    'portal.apps.auth',
    'portal.apps.tickets',
    'portal.apps.licenses',
    'portal.apps.notifications',
    'portal.apps.onboarding',
    'portal.apps.search',
    'portal.apps.webhooks',
    'portal.apps.workbench',
    'portal.apps.workspace',
    'portal.apps.system_monitor',
    'portal.apps.googledrive_integration',
    'portal.apps.datafiles',
    'portal.apps.projects',

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

    'impersonate.middleware.ImpersonateMiddleware',  # must be AFTER django.contrib.auth
]

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [os.path.join(BASE_DIR, 'templates')],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',

                'portal.utils.contextprocessors.analytics',
                'portal.utils.contextprocessors.debug',
                'portal.utils.contextprocessors.messages',
            ],
        },
    },
]

WSGI_APPLICATION = 'portal.wsgi.application'

AUTHENTICATION_BACKENDS = ['django.contrib.auth.backends.ModelBackend']

# Password validation
# https://docs.djangoproject.com/en/1.10/ref/settings/#auth-password-validators

AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]

IMPERSONATE_REQUIRE_SUPERUSER = True

LOGIN_REDIRECT_URL = '/index/'

# Internationalization
# https://docs.djangoproject.com/en/1.10/topics/i18n/

LANGUAGE_CODE = 'en-us'
TIME_ZONE = 'UTC'
USE_I18N = True
USE_L10N = True
USE_TZ = True

LANGUAGES = [
    ('en-us', 'US English')
]
# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/1.10/howto/static-files/

STATIC_URL = '/static/'
MEDIA_URL = '/media/'

STATICFILES_DIRS = [
    os.path.join(BASE_DIR, 'static'),
]

FIXTURE_DIRS = [
    os.path.join(BASE_DIR, 'fixtures'),
]

STATICFILES_FINDERS = [
    'django.contrib.staticfiles.finders.FileSystemFinder',
    'django.contrib.staticfiles.finders.AppDirectoriesFinder',
]

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': 'test'
    }
}

# DATABASES = {
#     'default': {
#         'ENGINE': 'django.db.backends.postgresql',
#         'NAME': 'test',
#         'USER': 'dev',
#         'PASSWORD': 'dev',
#         'HOST': 'frontera_prtl_postgres',
#         'PORT': '5432'
#     }
# }

ALLOCATION_SYSTEMS = []

PORTAL_NAMESPACE = 'test'
PORTAL_ALLOCATION = 'test'


PORTAL_KEYS_MANAGER = 'portal.apps.accounts.managers.ssh_keys.KeysManager'
PORTAL_PROJECTS_PEMS_APP_ID = 'pems.app-test'

PORTAL_PROJECTS_SYSTEM_PREFIX = 'test.project'

PORTAL_PROJECTS_ID_PREFIX = 'test.project'

PORTAL_PROJECTS_ROOT_DIR = '/path/to/root'

PORTAL_PROJECTS_ROOT_SYSTEM_NAME = 'projects.system.name'

PORTAL_PROJECTS_ROOT_HOST = 'host.for.projects'

PORTAL_PROJECTS_SYSTEM_PORT = 22

PORTAL_PROJECTS_PRIVATE_KEY = ('-----BEGIN RSA PRIVATE KEY-----'
                               'change this'
                               '-----END RSA PRIVATE KEY-----')
PORTAL_PROJECTS_PUBLIC_KEY = 'ssh-rsa change this'

PORTAL_USER_ACCOUNT_SETUP_STEPS = [
    {
        'step': 'portal.apps.onboarding.steps.test_steps.MockStep',
        'settings': {
            'key': 'value'
        }
    }
]
PORTAL_USER_ACCOUNT_SETUP_WEBHOOK_PWD = 'dev'

PORTAL_DATA_DEPOT_MANAGERS = {
    'my-data': 'portal.apps.data_depot.managers.private_data.FileManager',
    'shared': 'portal.apps.data_depot.managers.shared.FileManager',
    'my-projects': 'portal.apps.data_depot.managers.projects.FileManager',
    'google-drive': 'portal.apps.data_depot.managers.google_drive.FileManager'
}

PORTAL_SEARCH_MANAGERS = {
    'my-data': 'portal.apps.search.api.managers.private_data_search.PrivateDataSearchManager',
    'shared': 'portal.apps.search.api.managers.shared_search.SharedSearchManager',
    'cms': 'portal.apps.search.api.managers.cms_search.CMSSearchManager',
    # 'my-projects': 'portal.apps.data_depot.managers.projects.FileManager'
}

PORTAL_JOB_NOTIFICATION_STATES = ["PENDING", "STAGING_INPUTS", "SUBMITTING", "QUEUED", "RUNNING",
                                  "CLEANING_UP", "FINISHED", "STOPPED", "FAILED", "BLOCKED", "PAUSED"]

EXTERNAL_RESOURCE_SECRETS = {
    "google-drive": {
        "client_secret": "test",
        "client_id": "test",
        "name": "Google Drive",
        "directory": "external-resources"
    }
}

PORTAL_DATA_DEPOT_PAGE_SIZE = 100

PORTAL_WORKSPACE_MANAGERS = {
    'private': 'portal.apps.workspace.managers.private.FileManager',
    'shared': 'portal.apps.workspace.managers.shared.FileManager',
}
PORTAL_WORKSPACE_PAGE_SIZE = 100
# TAS Authentication.
TAS_URL = 'https://test.com'
TAS_CLIENT_KEY = 'test'
TAS_CLIENT_SECRET = 'test'
# Redmine Tracker Authentication.
RT_URL = 'test'
RT_HOST = 'https://test.com'
RT_UN = 'test'
RT_PW = 'test'
RT_QUEUE = 'test'
RT_TAG = 'test_tag'

# Agave Tenant.
AGAVE_TENANT_ID = 'portal'
AGAVE_TENANT_BASEURL = 'https://api.example.com'

# Agave Client Configuration
AGAVE_CLIENT_KEY = 'test'
AGAVE_CLIENT_SECRET = 'test'
AGAVE_SUPER_TOKEN = 'test'
AGAVE_STORAGE_SYSTEM = 'test'
AGAVE_DEFAULT_TRASH_NAME = 'test'

AGAVE_JWT_HEADER = 'HTTP_X_AGAVE_HEADER'
AGAVE_JWT_ISSUER = 'wso2.org/products/am'
AGAVE_JWT_USER_CLAIM_FIELD = 'http://wso2.org/claims/fullname'

ES_HOSTS = ['test.com']
ES_AUTH = "user:password"
ES_INDEX_PREFIX = "test-staging-{}"

SYSTEM_MONITOR_URL = "https://sysmon.example.com/foo.json"

HAYSTACK_CONNECTIONS = {
    'default': {
        'ENGINE': ('haystack.backends.elasticsearch_backend.'
                   'ElasticsearchSearchEngine'),
        'URL': 'test:9200/',
        'INDEX_NAME': 'cms',
    }
}
HAYSTACK_ROUTERS = ['aldryn_search.router.LanguageRouter', ]

"""
SETTINGS: LOGGING
"""

LOGGING = {
    'version': 1,
    'disable_existing_loggers': False,
    'formatters': {
        'default': {
            'format': '[DJANGO-TEST] %(levelname)s %(asctime)s %(module)s '
                      '%(name)s.%(funcName)s:%(lineno)s: %(message)s'
        },
        'metrics': {
            'format': '[METRICS-TEST] %(levelname)s %(module)s %(name)s.'
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
        'metrics_console': {
            'level': 'INFO',
            'class': 'logging.StreamHandler',
            'formatter': 'metrics',
        }
    },
    'loggers': {
        'django': {
            'handlers': ['console'],
            'level': 'INFO',
            'propagate': True,
        },
        'portal': {
            'handlers': ['console'],
            'level': 'DEBUG',
        },
        'metrics': {
            'handlers': ['metrics_console'],
            'level': 'INFO',
        },
        'paramiko': {
            'handlers': ['console'],
            'level': 'DEBUG'
        }
    },
}

MIGRATION_MODULES = {
    'auth': None,
    'contenttypes': None,


    'default': None,
    'core': None,
    'profiles': None,
}

COMMUNITY_INDEX_SCHEDULE = {'hour': 0, 'minute': 0, 'day_of_week': 0}

"""
SETTINGS: SUPPORTED FILE PREVIEW TYPES
"""

SUPPORTED_MS_WORD = [
    '.doc', '.dot', '.docx', '.docm', '.dotx', '.dotm', '.docb',
]
SUPPORTED_MS_EXCEL = [
    '.xls', '.xlt', '.xlm', '.xlsx', '.xlsm', '.xltx', '.xltm',
]
SUPPORTED_MS_POWERPOINT = [
    '.ppt', '.pot', '.pps', '.pptx', '.pptm',
    '.potx', '.ppsx', '.ppsm', '.sldx', '.sldm',
]

SUPPORTED_MS_OFFICE = (
    SUPPORTED_MS_WORD +
    SUPPORTED_MS_POWERPOINT +
    SUPPORTED_MS_EXCEL
)

SUPPORTED_IMAGE_PREVIEW_EXTS = [
    '.png', '.gif', '.jpg', '.jpeg',
]

SUPPORTED_TEXT_PREVIEW_EXTS = [
    '.as', '.as3', '.asm', '.bat', '.c', '.cc', '.cmake', '.cpp',
    '.cs', '.css', '.csv', '.cxx', '.diff', '.groovy', '.h', '.haml',
    '.hh', '.htm', '.html', '.java', '.js', '.less', '.m', '.make', '.md',
    '.ml', '.mm', '.msg', '.php', '.pl', '.properties', '.py', '.rb',
    '.sass', '.scala', '.script', '.sh', '.sml', '.sql', '.txt', '.vi',
    '.vim', '.xml', '.xsd', '.xsl', '.yaml', '.yml', '.tcl', '.json',
    '.out', '.err', '.f',
]

SUPPORTED_OBJECT_PREVIEW_EXTS = [
    '.pdf',
]

SUPPORTED_IPYNB_PREVIEW_EXTS = [
    '.ipynb'
]

SUPPORTED_PREVIEW_EXTENSIONS = (SUPPORTED_IMAGE_PREVIEW_EXTS +
                                SUPPORTED_TEXT_PREVIEW_EXTS +
                                SUPPORTED_OBJECT_PREVIEW_EXTS +
                                SUPPORTED_MS_OFFICE +
                                SUPPORTED_IPYNB_PREVIEW_EXTS)

# Channels
ASGI_APPLICATION = 'portal.routing.application'
CHANNEL_LAYERS = {
    'default': {
        'BACKEND': 'channels.layers.InMemoryChannelLayer',
    },
}
PORTAL_DATA_DEPOT_LOCAL_STORAGE_SYSTEM_DEFAULT = 'frontera'
PORTAL_DATA_DEPOT_LOCAL_STORAGE_SYSTEMS = {
    'frontera': {
        'name': 'My Data (Frontera)',
        'description': 'My Data on Frontera for {username}',
        'site': 'frontera',
        'systemId': 'frontera.home.{username}',
        'host': 'frontera.tacc.utexas.edu',
        'rootDir': '/home1/{tasdir}',
        'port': 22,
        'icon': None,
    },
    'longhorn': {
        'name': 'My Data (Longhorn)',
        'systemId': 'longhorn.home.{username}',
        'host': 'longhorn.tacc.utexas.edu',
        'rootDir': '/home/{tasdir}',
        'port': 22,
        'requires_allocation': 'longhorn3',
        'icon': None,
    }
}

PORTAL_EXEC_SYSTEMS = {
    'data.tacc.utexas.edu': {
        'scratch_dir': '/scratch/{}',
        'home_dir': '/home/{}'
    },
    'stampede2.tacc.utexas.edu': {
        'scratch_dir': '/scratch/{}',
        'home_dir': '/home/{}'
    },
    'lonestar5.tacc.utexas.edu': {
        'scratch_dir': '/scratch/{}',
        'home_dir': '/home/{}'
    },
    'longhorn.tacc.utexas.edu': {
        'scratch_dir': '/scratch/{}',
        'home_dir': '/home/{}'
    },
    'frontera.tacc.utexas.edu': {
        'scratch_dir': '/scratch1/{}',
        'home_dir': '/home1/{}'
    }
}

PORTAL_DATAFILES_STORAGE_SYSTEMS = [
    {
        'name': 'Community Data',
        'system': 'portal.storage.community',
        'scheme': 'community',
        'api': 'tapis',
        'icon': None
    },
    {
        'name': 'Shared Workspaces',
        'scheme': 'projects',
        'api': 'tapis',
        'icon': 'publications'
    },
    {
        'name': 'Google Drive',
        'system': 'googledrive',
        'scheme': 'private',
        'api': 'googledrive',
        'icon': None
    },
    {
        'name': 'Public Data',
        'system': 'portal.storage.public',
        'scheme': 'public',
        'api': 'tapis',
        'icon': None
    }
]

WH_BASE_URL = "https://testserver"
PORTAL_KEY_SERVICE_ACTOR_ID = "test.actorId"

WORKBENCH_SETTINGS = {
    "debug": False
}
