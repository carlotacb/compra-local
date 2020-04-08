import os


def _get(env_key):
    if env_key in os.environ:
        return os.environ[env_key]
    return None


def get_db_user():
    return _get('DB_USER')


def get_db_password():
    return _get('DB_PASSWORD')


def get_db_database():
    return _get('DB_DB')


def get_db_host():
    return _get('DB_HOST')


def get_db_port():
    return _get('DB_PORT')
