from src.db.sqlalchemy import db_session
from src.helper import log
from src.model.product_group import ProductGroup


def add_dummy_data():
    count = db_session().query(ProductGroup.id).count()
    if count == 0:
        log.info(f'Adding dummy data for {ProductGroup.__tablename__}...')
    else:
        log.info(f'Skipping dummy data for {ProductGroup.__tablename__} because is not empty.')
