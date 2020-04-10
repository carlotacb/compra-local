from src.db.sqlalchemy import db_session
from src.helper import log
from src.model.category import Category


def add_dummy_data():
    count = db_session().query(Category.id).count()
    if count == 0:
        log.info(f'Adding dummy data for {Category.__tablename__}...')
    else:
        log.info(f'Skipping dummy data for {Category.__tablename__} because is not empty.')
