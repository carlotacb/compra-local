from src.db.sqlalchemy import db_session
from src.helper import log
from src.model.category import Category


def add_dummy_data():
    count = db_session().query(Category.id).count()
    if count == 0:
        log.info(f'Adding dummy data for {Category.__tablename__}...')
        object_list = [
            Category(name='Fruiteria'),
            Category(name='Farmacia'),
            Category(name='Fleca'),
            Category(name='Ferreteria'),
            Category(name='Cafeteria'),
            Category(name='Carnisseria')
        ]
        db_session().bulk_save_objects(object_list)
        db_session().commit()
    else:
        log.info(f'Skipping dummy data for {Category.__tablename__} because is not empty.')


def get_id_by_name(name):
    category = db_session().query(Category).filter_by(name=name).first()
    return category.id


def get(category_id):
    category = db_session().query(Category).filter_by(id=category_id).first()
    return category if category else None
