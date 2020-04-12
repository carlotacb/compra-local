from sqlalchemy import create_engine, MetaData
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import scoped_session, sessionmaker

from src.config import TEST_DB_USER, TEST_DB_PASSWORD, TEST_DB_HOST, TEST_DB_PORT, TEST_DB_DB
from src.helper import env, log


def _connect():
    log.info('Connecting to DB...')
    db_user = TEST_DB_USER if env.is_development() else env.get_db_user()
    db_password = TEST_DB_PASSWORD if env.is_development() else env.get_db_password()
    db_host = TEST_DB_HOST if env.is_development() else env.get_db_host()
    db_port = TEST_DB_PORT if env.is_development() else env.get_db_port()
    db_database = TEST_DB_DB if env.is_development() else env.get_db_database()
    url = 'postgresql://{}:{}@{}:{}/{}'.format(
        db_user,
        db_password,
        db_host,
        db_port,
        db_database
    )
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


def _add_dummy_data():
    log.info('Importing services...')
    from src.service import category
    from src.service import local
    from src.service import opening_hours_item
    from src.service import user
    from src.service import product_group
    from src.service import product
    from src.service import order_group
    from src.service import order
    from src.service import order_item
    from src.service import review_local
    from src.service import review_user
    log.info('Adding dummy data...')
    category.add_dummy_data()
    local.add_dummy_data()
    opening_hours_item.add_dummy_data()
    user.add_dummy_data()
    product_group.add_dummy_data()
    product.add_dummy_data()
    order_group.add_dummy_data()
    order.add_dummy_data()
    order_item.add_dummy_data()
    review_local.add_dummy_data()
    review_user.add_dummy_data()


# Declare base.
Base = declarative_base()

# Connect to the database.
engine, meta = _connect()
_create_tables(engine)

# Set up session
db_session = scoped_session(sessionmaker(bind=engine))
Base.query = db_session.query_property()

# Dummy data
_add_dummy_data()
