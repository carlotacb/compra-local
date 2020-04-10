from sqlalchemy.exc import IntegrityError

from src.db.sqlalchemy import db_session
from src.model.local import Local
from src.helper import log, image
from src.service import category as category_service


def get(local_id):
    local = db_session().query(Local).filter_by(id=local_id).first()
    return local if local else None


def get_all():
    local = db_session().query(Local).all()
    return local if local else None


def create(name, description, postal_address, latitude, longitude, website, phone_number, pick_up, delivery, category, image=None):
    try:
        local = Local(name=name, description=description, 
                      postal_address=postal_address, latitude=latitude,
                      longitude=longitude, website=website, phone_number=phone_number,
                      pick_up=pick_up, delivery=delivery, image=image,
                      category_id=category)
        if image:
            encoded_image = image_util.resize(image)
            if encoded_image:
                user.image = encoded_image
        db_session().add(local)
        db_session().commit()
        return local.id, None
    except IntegrityError as e:
        return None, str(e.args[0]).replace('\n', ' ')


def add_dummy_data():
    count = db_session().query(Local.id).count()
    if count == 0:
        log.info(f'Adding dummy data for {Local.__tablename__}...')
        object_list = [
            Local(
                name='Bona Fruita Busquets', description='La fruiteria del teu barri.',
                postal_address='Carrer de Sants, 258, 08028 Barcelona',
                latitude=41.375647, longitude=2.127905, website=None, phone_number='933 39 91 18',
                pick_up=True, delivery=True, image=image.decode_and_resize('test/mock/local_image_1.jpg'),
                category=category_service.get_id_by_name('Fruiteria')
            ),
            Local(
                name='Farmacia Bassegoda', description='La farmacia del teu barri.',
                postal_address='Carrer de Bassegoda, 11, 08028 Barcelona',
                latitude=41.375191, longitude=2.125832, website=None, phone_number='934 40 09 55',
                pick_up=True, delivery=False, image=image.decode_and_resize('test/mock/local_image_2.jpg'),
                category=category_service.get_id_by_name('Farmacia')
            )
        ]
        db_session().bulk_save_objects(object_list)
        db_session().commit()
    else:
        log.info(f'Skipping dummy data for {Local.__tablename__} because is not empty.')


def get_id_by_name(name):
    category = db_session().query(Local).filter_by(name=name).first()
    return category.id


def get_all_coordinates():
    local_dict = dict()
    for local in db_session().query(Local).all():
        local_dict[local.id] = dict(latitude=local.latitude, longitude=local.longitude)
    return local_dict
