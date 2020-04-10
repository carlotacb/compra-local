from src.db.sqlalchemy import db_session
from src.helper import log
from src.model.order_item import OrderItem


def add_dummy_data():
    count = db_session().query(OrderItem.id).count()
    if count == 0:
        log.info(f'Adding dummy data for {OrderItem.__tablename__}...')
    else:
        log.info(f'Skipping dummy data for {OrderItem.__tablename__} because is not empty.')
