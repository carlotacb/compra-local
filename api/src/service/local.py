from src.db.sqlalchemy import db_session
from src.helper import log
from src.model.local import Local


def add_dummy_data():
    count = db_session().query(Local.id).count()
    if count == 0:
        log.info(f'Adding dummy data for {Local.__tablename__}...')
    else:
        log.info(f'Skipping dummy data for {Local.__tablename__} because is not empty.')


def get_all_coordinates():
    local_dict = dict()
    for local in db_session().query(Local).all():
        local_dict[local.id] = dict(latitude=local.latitude, longitude=local.longitude)
    return local_dict
