from src.db.sqlalchemy import db_session
from src.helper import log
from src.model.order import Order


def add_dummy_data():
    count = db_session().query(Order.id).count()
    if count == 0:
        log.info(f'Adding dummy data for {Order.__tablename__}...')
    else:
        log.info(f'Skipping dummy data for {Order.__tablename__} because is not empty.')
