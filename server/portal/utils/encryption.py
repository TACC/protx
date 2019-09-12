"""
.. :module:: portal.utils.encryption
   :synopsis: Utilities to handle encryption and ssh keys
"""

import logging
import base64
from Crypto.PublicKey import RSA
from Crypto.Cipher import AES
from Crypto.Hash import SHA256
from Crypto import Random
from django.conf import settings

# pylint: disable=invalid-name
logger = logging.getLogger(__name__)
# pylint: enable=invalid-name


def create_private_key(bits=2048):
    """Creates a brand new RSA key

    :param int bits: Key bits
    """
    key = RSA.generate(bits)
    return key


def create_public_key(key):
    """Returns public key

    :param key: RSA key
    """
    pub_key = key.publickey()
    return pub_key


def export_key(key, format='PEM'):  # pylint: disable=redefined-builtin
    """Exports private key

    :param key: RSA key
    :param str format: Format to export key

    .. note::
        Use `format='PEM'` for exporting private keys
        and `format='OpenSSH' for exporting public keys
    """
    return key.exportKey(format)


def encrypt(raw):
    """Encrypts string using AES

    :param str raw: raw string to encrypt

    .. note::
        Shamelessly copied from:
        https://stackoverflow.com/questions/42568262/how-to-encrypt-text-with-a-password-in-python/44212550#44212550
    """
    source = raw.encode('utf-8')
    # Use hash to make sure size is appropiate
    key = SHA256.new(settings.SECRET_KEY).digest()
    # pylint: disable=invalid-name
    IV = Random.new().read(AES.block_size)
    # pylint: enable=invalid-name
    encryptor = AES.new(key, AES.MODE_CBC, IV)
    # calculate needed padding
    padding = AES.block_size - len(source) % AES.block_size
    source += chr(padding) * padding
    # Python 3.x: source += bytes([padding]) * padding
    # store the IV at the beginning and encrypt
    data = IV + encryptor.encrypt(source)
    return base64.b64encode(data).decode("utf-8")


def decrypt(raw):
    """Decrypts a base64 encoded string

    :param source: base64 encoded string
    """
    source = base64.b64decode(raw.encode("utf-8"))
    # use SHA-256 over our key to get a proper-sized AES key
    key = SHA256.new(settings.SECRET_KEY).digest()
    # extract the IV from the beginning
    # pylint: disable=invalid-name
    IV = source[:AES.block_size]
    # pylint: enable=invalid-name
    decryptor = AES.new(key, AES.MODE_CBC, IV)
    # decrypt
    data = decryptor.decrypt(source[AES.block_size:])
    # pick the padding value from the end;
    padding = ord(data[-1])
    # Python 3.x: padding = data[-1]
    # Python 3.x: if data[-padding:] != bytes([padding]) * padding:
    if data[-padding:] != chr(padding) * padding:
        raise ValueError("Invalid padding...")
    # remove the padding
    return data[:-padding]
