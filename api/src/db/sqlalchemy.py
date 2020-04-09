from sqlalchemy import create_engine, MetaData
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import scoped_session, sessionmaker

from src.helper import env, log
from src.model.user import User


def _connect():
    log.info('Connecting to DB...')
    url = 'postgresql://{}:{}@{}:{}/{}'.format(
        env.get_db_user(),
        env.get_db_password(),
        env.get_db_host(),
        env.get_db_port(),
        env.get_db_database())
    _engine = create_engine(url, client_encoding='utf8')
    _meta = MetaData(bind=_engine)
    log.info('Connection satisfied.')
    return _engine, _meta


def _create_tables(engine_object):
    log.info('Creating tables if they do not exist...')
    User.__table__.create(bind=engine_object, checkfirst=True)
    log.info('Tables created (or not).')


# Connect to the database.
engine, meta = _connect()
_create_tables(engine)
db_session = scoped_session(sessionmaker(bind=engine))

# Declare base.
Base = declarative_base()
Base.query = db_session.query_property()
