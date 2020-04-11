from sqlalchemy import func
from sqlalchemy.exc import IntegrityError

from src.db.sqlalchemy import db_session
from src.helper import log
from src.model.review_local import ReviewLocal
from src.service import local as local_service
from src.service import order as order_service
from src.service import user as user_service


def add_dummy_data():
    count = db_session().query(ReviewLocal.id).count()
    if count == 0:
        log.info(f'Adding dummy data for {ReviewLocal.__tablename__}...')
        object_list = [
            ReviewLocal(
                punctuation=4, comment='Super bo tot!', order_id=1,
                writer_id=user_service.get_id_by_name('Albert Suarez'),
                local_id=local_service.get_id_by_name('Bona Fruita Busquets')
            )
        ]
        db_session().bulk_save_objects(object_list)
        db_session().commit()
    else:
        log.info(f'Skipping dummy data for {ReviewLocal.__tablename__} because is not empty.')


def get_average(local_id):
    avg = db_session().query(func.avg(ReviewLocal.punctuation)).filter(ReviewLocal.local_id == local_id).scalar()
    return 0 if not avg else int(avg)


def get_all(local_id):
    review_list = list()
    review_orm_list = db_session().query(ReviewLocal).filter_by(local_id=local_id).all()
    for review_orm in review_orm_list:
        review_list.append(dict(
            punctuation=review_orm.punctuation,
            comment=review_orm.comment,
            writer=review_orm.writer.name
        ))
    return review_list


def create(writer_id, order_id, punctuation, comment=None):
    try:
        order = order_service.get(order_id)
        review_local = ReviewLocal(
            punctuation=punctuation,
            comment=str() if not comment else comment,
            writer_id=writer_id,
            local_id=order.local_id,
            order_id=order_id
        )
        db_session().add(review_local)
        db_session().commit()
        return review_local.id, None
    except IntegrityError as e:
        return None, str(e.args[0]).replace('\n', ' ')
