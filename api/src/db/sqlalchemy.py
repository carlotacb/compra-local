from sqlalchemy import create_engine, MetaData
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import scoped_session, sessionmaker

from src.helper import env


def _connect():
    url = 'postgresql://{}:{}@{}:{}/{}'.format(
        env.get_db_user(), env.get_db_password(), env.get_db_host(), env.get_db_port(), env.get_db_database()
    )
    _engine = create_engine(url, client_encoding='utf8')
    _meta = MetaData(bind=_engine, reflect=True)
    return _engine, _meta


# Connect to the database.
engine, meta = _connect()
db_session = scoped_session(sessionmaker(bind=engine))

# Declare base.
Base = declarative_base()
Base.query = db_session.query_property()
