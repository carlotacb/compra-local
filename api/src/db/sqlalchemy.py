from sqlalchemy import create_engine, MetaData
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import scoped_session, sessionmaker

from src.helper import env, log


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
    log.info('Importing tables...')
    from src.model.category import Category
    from src.model.local import Local
    from src.model.opening_hours_item import OpeningHoursItem
    from src.model.user import User
    from src.model.product_group import ProductGroup
    from src.model.product import Product
    from src.model.order_group import OrderGroup
    from src.model.order import Order
    from src.model.order_item import OrderItem
    from src.model.review_local import ReviewLocal
    from src.model.review_user import ReviewUser
    log.info('Creating tables if they do not exist...')
    Category.__table__.create(bind=engine_object, checkfirst=True)
    Local.__table__.create(bind=engine_object, checkfirst=True)
    OpeningHoursItem.__table__.create(bind=engine_object, checkfirst=True)
    User.__table__.create(bind=engine_object, checkfirst=True)
    ProductGroup.__table__.create(bind=engine_object, checkfirst=True)
    Product.__table__.create(bind=engine_object, checkfirst=True)
    OrderGroup.__table__.create(bind=engine_object, checkfirst=True)
    Order.__table__.create(bind=engine_object, checkfirst=True)
    OrderItem.__table__.create(bind=engine_object, checkfirst=True)
    ReviewLocal.__table__.create(bind=engine_object, checkfirst=True)
    ReviewUser.__table__.create(bind=engine_object, checkfirst=True)
    log.info('Tables created (or not).')


# Declare base.
Base = declarative_base()

# Connect to the database.
engine, meta = _connect()
_create_tables(engine)

# Set up session
db_session = scoped_session(sessionmaker(bind=engine))
Base.query = db_session.query_property()
