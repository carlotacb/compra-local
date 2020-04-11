from sqlalchemy import func

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


def get_average(user_id):
    avg = db_session().query(func.avg(ReviewUser.punctuation)).filter(ReviewUser.user_id == user_id).scalar()
    return 0 if not avg else int(avg)


def get_all(user_id):
    review_list = list()
    review_orm_list = db_session().query(ReviewUser).filter_by(user_id=user_id).all()
    for review_orm in review_orm_list:
        review_list.append(dict(
            punctuation=review_orm.punctuation,
            comment=review_orm.comment,
            writer=review_orm.writer.name
        ))
    return review_list
