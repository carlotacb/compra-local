from src.db.sqlalchemy import db_session
from src.helper import log
from src.model.review_user import ReviewUser
from src.service import user as user_service


def add_dummy_data():
    count = db_session().query(ReviewUser.id).count()
    if count == 0:
        log.info(f'Adding dummy data for {ReviewUser.__tablename__}...')
        object_list = [
            ReviewUser(
                punctuation=5, comment='Molt bona gent!', order_group_id=1,
                writer_id=user_service.get_id_by_name('Albert Suarez'),
                user_id=user_service.get_id_by_name('Andreu Gallofre'),
            )
        ]
        db_session().bulk_save_objects(object_list)
        db_session().commit()
    else:
        log.info(f'Skipping dummy data for {ReviewUser.__tablename__} because is not empty.')
