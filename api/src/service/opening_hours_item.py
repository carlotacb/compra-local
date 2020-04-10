from src.db.sqlalchemy import db_session
from src.helper import log
from src.model.opening_hours_item import OpeningHoursItem


def add_dummy_data():
    count = db_session().query(OpeningHoursItem.id).count()
    if count == 0:
        log.info(f'Adding dummy data for {OpeningHoursItem.__tablename__}...')
    else:
        log.info(f'Skipping dummy data for {OpeningHoursItem.__tablename__} because is not empty.')
