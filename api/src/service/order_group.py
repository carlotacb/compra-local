from src.db.sqlalchemy import db_session
from src.helper import log
from src.model.order_group import OrderGroup


def add_dummy_data():
    count = db_session().query(OrderGroup.id).count()
    if count == 0:
        log.info(f'Adding dummy data for {OrderGroup.__tablename__}...')
    else:
        log.info(f'Skipping dummy data for {OrderGroup.__tablename__} because is not empty.')
