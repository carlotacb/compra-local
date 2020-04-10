from src.db.sqlalchemy import db_session
from src.helper import log
from src.model.review_user import ReviewUser


def add_dummy_data():
    count = db_session().query(ReviewUser.id).count()
    if count == 0:
        log.info(f'Adding dummy data for {ReviewUser.__tablename__}...')
    else:
        log.info(f'Skipping dummy data for {ReviewUser.__tablename__} because is not empty.')
