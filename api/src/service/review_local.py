from src.db.sqlalchemy import db_session
from src.helper import log
from src.model.review_local import ReviewLocal


def add_dummy_data():
    count = db_session().query(ReviewLocal.id).count()
    if count == 0:
        log.info(f'Adding dummy data for {ReviewLocal.__tablename__}...')
    else:
        log.info(f'Skipping dummy data for {ReviewLocal.__tablename__} because is not empty.')
