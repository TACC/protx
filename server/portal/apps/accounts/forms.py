from django import forms
from django.contrib.auth import get_user_model
from django.conf import settings
# TODO: Re-implement captcha
# from snowpenguin.django.recaptcha2.fields import ReCaptchaField
# from snowpenguin.django.recaptcha2.widgets import ReCaptchaWidget

from .models import (PortalProfile, NotificationPreferences)
from termsandconditions.models import TermsAndConditions, UserTermsAndConditions
from pytas.http import TASClient
import re
import logging


logger = logging.getLogger(__name__)


tas = TASClient(baseURL=settings.TAS_URL, credentials={'username': settings.TAS_CLIENT_KEY, 'password': settings.TAS_CLIENT_SECRET})


ELIGIBLE = 'Eligible'
INELIGIBLE = 'Ineligible'
REQUESTED = 'Requested'
PI_ELIGIBILITY = (
    ('', 'Choose One'),
    (ELIGIBLE, ELIGIBLE),
    (INELIGIBLE, INELIGIBLE),
    (REQUESTED, REQUESTED),
)

USER_PROFILE_TITLES = (
    ('', 'Choose one'),
    ('Center Non-Researcher Staff', 'Center Non-Researcher Staff'),
    ('Center Researcher Staff', 'Center Researcher Staff'),
    ('Faculty', 'Faculty'),
    ('Government User', 'Government User'),
    ('Graduate Student', 'Graduate Student'),
    ('High School Student', 'High School Student'),
    ('High School Teacher', 'High School Teacher'),
    ('Industrial User', 'Industrial User'),
    ('Unaffiliated User', 'Unaffiliated User'),
    ('Nonprofit User', 'Nonprofit User'),
    ('NSF Graduate Research Fellow', 'NSF Graduate Research Fellow'),
    ('Other User', 'Other User'),
    ('Postdoctorate', 'Postdoctorate'),
    ('Undergraduate Student', 'Undergraduate Student'),
    ('Unknown', 'Unknown'),
    ('University Non-Research Staff', 'University Non-Research Staff'),
    ('University Research Staff', 'University Research Staff (excluding postdoctorates)'),
)

ETHNICITY_OPTIONS = (
    ('', 'Choose one'),
    ('Decline', 'Decline to Identify'),
    ('White', 'White'),
    ('Asian', 'Asian'),
    ('Black or African American', 'Black or African American'),
    ('Hispanic or Latino', 'Hispanic or Latino'),
    ('American Indian or Alaska Native', 'American Indian or Alaska Native'),
    ('Native Hawaiian or Other Pacific Islander', 'Native Hawaiian or Other Pacific Islander'),
    ('Two or more races', 'Two or more races, not Hispanic')
)

GENDER_OPTIONS = (
    ('', 'Choose one'),
    ('Decline', 'Decline to Identify'),
    ('Male', 'Male'),
    ('Female', 'Female'),
    ('Other', 'Other'),
)

PROFESSIONAL_LEVEL_OPTIONS = (
    ('Undergraduate Student', 'Undergraduate Student'),
    ('Graduate Student', 'Graduate Student'),
    ('Postdoctoral Researcher', 'Postdoctoral Researcher'),
    ('Faculty or Researcher', 'Faculty or Researcher'),
    ('Staff (support, administration, etc)', 'Staff (support, administration, etc)'),
    ('Practicing Engineer or Architect', 'Practicing Engineer or Architect'),
    ('Other', 'Other')
)


def get_institution_choices():
    institutions_list = tas.institutions()
    return (('', 'Choose one'),) + tuple((c['id'], c['name']) for c in institutions_list)


def get_department_choices(institutionId):
    departments_list = tas.get_departments(institutionId)
    return (('', 'Choose one'),) + tuple((c['id'], c['name']) for c in departments_list)


def get_country_choices():
    countries_list = tas.countries()
    return (('', 'Choose one'),) + tuple((c['id'], c['name']) for c in countries_list)


class EmailConfirmationForm(forms.Form):
    code = forms.CharField(
        label='Enter Your Activation Code',
        required=True,
        error_messages={
            'required': 'Please enter the activation code you received via email.'
        })

    username = forms.CharField(
        label='Enter Your TACC Username',
        required=True)

    password = forms.CharField(
        widget=forms.PasswordInput,
        label='Enter Your TACC Password',
        required=True)


def check_password_policy(user, password, confirmPassword):
    """
    Checks the password for meeting the minimum password policy requirements:
    * Must be a minimum of 8 characters in length
    * Must contain characters from at least three of the following: uppercase letters,
      lowercase letters, numbers, symbols
    * Must NOT contain the username or the first or last name from the profile

    Returns:
        A boolean value indicating if the password meets the policy,
        An error message string or None
    """
    if password != confirmPassword:
        return False, 'The password provided does not match the confirmation.'

    if len(password) < 8:
        return False, 'The password provided is too short. Please review the password criteria.'

    char_classes = 0
    for cc in ['[a-z]', '[A-Z]', '[0-9]', '[^a-zA-Z0-9]']:
        if re.search(cc, password):
            char_classes += 1

    if char_classes < 3:
        return False, 'The password provided does not meet the complexity requirements.'

    pwd_without_case = password.lower()
    if user['username'].lower() in pwd_without_case:
        return False, 'The password provided must not contain parts of your name or username.'

    if user['firstName'].lower() in pwd_without_case or \
            user['lastName'].lower() in pwd_without_case:
        return False, 'The password provided must not contain parts of your name or username.'

    return True, None


class PasswordResetRequestForm(forms.Form):
    username = forms.CharField(label='Enter Your TACC Username', required=True)


class PasswordResetConfirmForm(forms.Form):
    code = forms.CharField(label='Reset Code', required=True)
    username = forms.CharField(label='Enter Your TACC Username', required=True)
    password = forms.CharField(widget=forms.PasswordInput, label='New Password', required=True)
    confirmPassword = forms.CharField(
        widget=forms.PasswordInput,
        label='Confirm New Password',
        required=True,
        help_text='Passwords must meet the following criteria:<ul>'
                  '<li>Must not contain your username or parts of your full name;</li>'
                  '<li>Must be a minimum of 8 characters in length;</li>'
                  '<li>Must contain characters from at least three of the following: '
                  'uppercase letters, lowercase letters, numbers, symbols</li></ul>')

    def clean(self):
        cleaned_data = self.cleaned_data
        username = cleaned_data.get('username')

        try:
            user = tas.get_user(username=username)
        except Exception:
            msg = 'The username provided does not match an existing user.'
            self.add_error('username', msg)
            raise forms.ValidationError(msg)

        password = cleaned_data.get('password')
        confirmPassword = cleaned_data.get('confirmPassword')

        valid, error_message = check_password_policy(user, password, confirmPassword)
        if not valid:
            self.add_error('password', error_message)
            self.add_error('confirmPassword', '')
            raise forms.ValidationError(error_message)


class TasUserProfileAdminForm(forms.Form):
    """
    Admin Form for TAS User Profile. Adds a field to trigger a password reset
    on the User's behalf.
    """
    firstName = forms.CharField(label="First name")
    lastName = forms.CharField(label="Last name")
    email = forms.EmailField()
    phone = forms.CharField()
    piEligibility = forms.ChoiceField(
        choices=PI_ELIGIBILITY,
        label="PI Eligibility"
    )
    reset_password = forms.BooleanField(
        required=False,
        label="Reset user's password",
        help_text="Check this box to reset the user's password. The user will be "
        "notified via email with instructions to complete the password reset."
    )


class RequestAccessForm(forms.Form):
    username = forms.CharField(label='TACC Username', required=True)
    password = forms.CharField(label='TACC Password', widget=forms.PasswordInput, required=True)
    # captcha = ReCaptchaField(widget=ReCaptchaWidget)


class UserRegistrationForm(forms.Form):
    """
    Except for `institution`, this is the same form as `UserProfileForm`. However,
    due to limited ability to control field order, we cannot cleanly inherit from that
    form.
    """
    firstName = forms.CharField(label='First name')
    lastName = forms.CharField(label='Last name')
    email = forms.EmailField()
    phone = forms.CharField()
    institutionId = forms.ChoiceField(
        label='Institution', choices=(),
        error_messages={'invalid': 'Please select your affiliated institution'})
    departmentId = forms.ChoiceField(label='Department', choices=(), required=False)
    institution = forms.CharField(
        label='Institution name',
        help_text='If your institution is not listed, please provide the name of the '
        'institution as it should be shown here.',
        required=False,
    )
    title = forms.ChoiceField(label='Position/Title', choices=USER_PROFILE_TITLES)
    countryId = forms.ChoiceField(
        label='Country of residence', choices=(),
        error_messages={'invalid': 'Please select your Country of residence'})
    citizenshipId = forms.ChoiceField(
        label='Country of citizenship', choices=(),
        error_messages={'invalid': 'Please select your Country of citizenship'})

    # ethnicity = forms.ChoiceField(label='Ethnicity', choices=ETHNICITY_OPTIONS)
    # gender = forms.ChoiceField(label='Gender', choices=GENDER_OPTIONS)

    username = forms.RegexField(
        label='Username',
        help_text='Usernames must be 3-8 characters in length, start with a letter, and '
                  'can contain only lowercase letters, numbers, or underscore.',
        regex='^[a-z][a-z0-9_]{2,7}$')
    password = forms.CharField(widget=forms.PasswordInput, label='Password')
    confirmPassword = forms.CharField(
        label='Confirm Password', widget=forms.PasswordInput,
        help_text='Passwords must meet the following criteria:<ul>'
                  '<li>Must not contain your username or parts of your full name;</li>'
                  '<li>Must be a minimum of 8 characters in length;</li>'
                  '<li>Must contain characters from at least three of the following: '
                  'uppercase letters, lowercase letters, numbers, symbols</li></ul>')
    agree_to_terms = forms.BooleanField(
        label='I Agree to the <a href="/terms/" target="_blank">Terms of Use</a>',
        error_messages={'required': 'Please Accept the Portal Terms of Use.'})

    # captcha = ReCaptchaField(widget=ReCaptchaWidget)

    def __init__(self, *args, **kwargs):
        super(UserRegistrationForm, self).__init__(*args, **kwargs)
        self.fields['institutionId'].choices = get_institution_choices()
        self.fields['institutionId'].choices += (('-1', 'My Institution is not listed'),)

        data = self.data or self.initial
        if data is not None and 'institutionId' in data and data['institutionId']:
            self.fields['departmentId'].choices = get_department_choices(data['institutionId'])

        self.fields['countryId'].choices = get_country_choices()
        self.fields['citizenshipId'].choices = get_country_choices()

    def clean(self):
        username = self.cleaned_data.get('username')
        firstName = self.cleaned_data.get('firstName')
        lastName = self.cleaned_data.get('lastName')
        password = self.cleaned_data.get('password')
        confirmPassword = self.cleaned_data.get('confirmPassword')

        if username and firstName and lastName and password and confirmPassword:
            valid, error_message = check_password_policy(self.cleaned_data,
                                                         password,
                                                         confirmPassword)
            if not valid:
                self.add_error('password', error_message)
                self.add_error('confirmPassword', '')
                raise forms.ValidationError(error_message)

    def save(self, source='Portal', pi_eligibility=INELIGIBLE):
        data = self.cleaned_data
        data['source'] = source
        data['piEligibility'] = pi_eligibility

        safe_data = data.copy()
        safe_data['password'] = safe_data['confirmPassword'] = '********'

        logger.info('Attempting new user registration: %s' % safe_data)
        tas_user = tas.save_user(None, data)

        # create local user
        UserModel = get_user_model()
        try:
            # the user should not exist
            user = UserModel.objects.get(username=data['username'])
            logger.warning('On TAS registration, local user already existed? '
                           'user=%s' % user)
        except UserModel.DoesNotExist:
            user = UserModel.objects.create_user(
                username=data['username'],
                first_name=tas_user['firstName'],
                last_name=tas_user['lastName'],
                email=tas_user['email'],
            )

        # extended profile information
        try:
            # again, this should not exist
            ds_profile = PortalProfile.objects.get(user=user)
            # ds_profile.ethnicity = data['ethnicity']
            # ds_profile.gender = data['gender']
        except PortalProfile.DoesNotExist:
            ds_profile = PortalProfile(
                user=user  # ,
                # ethnicity=data['ethnicity'],
                # gender=data['gender']
            )
        ds_profile.save()

        # terms of use
        logger.info('Prior to Registration, %s %s <%s> agreed to Terms of Use' % (
            data['firstName'], data['lastName'], data['email']))
        try:
            terms = TermsAndConditions.get_active()
            user_terms = UserTermsAndConditions(user=user, terms=terms)
            user_terms.save()
        except Exception:
            logger.exception('Error saving UserTermsAndConditions for user=%s', user)

        return tas_user


class NotificationPreferencesForm(forms.ModelForm):

    class Meta:
        model = NotificationPreferences
        exclude = ['user']