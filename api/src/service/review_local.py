from src.db.sqlalchemy import db_session
from src.helper import log
from src.model.review_local import ReviewLocal
from src.service import local as local_service
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
