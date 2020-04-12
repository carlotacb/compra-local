from sqlalchemy.exc import IntegrityError

from src.config import TAG_LOCAL_PICK_UP, TAG_LOCAL_DELIVERY, TAG_LOCAL_OPEN
from src.db.sqlalchemy import db_session
from src.model.local import Local
from src.helper import image as image_util, log
from src.service import category as category_service
from src.service import opening_hours_item as opening_hours_item_service
from src.service import review_local as review_local_service
from src.service import user as user_service


def add_dummy_data():
    count = db_session().query(Local.id).count()
    if count == 0:
        log.info(f'Adding dummy data for {Local.__tablename__}...')
        object_list = [
            Local(
                name='Bona Fruita Busquets', description='La fruiteria del teu barri.',
                postal_address='Carrer de Sants, 258, 08028 Barcelona',
                latitude=41.375647, longitude=2.127905, website=None, phone_number='933399118',
                pick_up=True, delivery=True, image=image_util.decode_and_resize('test/mock/local_image_1.jpg'),
                category_id=category_service.get_id_by_name('Fruiteria')
            ),
            Local(
                name='Farmacia Bassegoda', description='La farmacia del teu barri.',
                postal_address='Carrer de Bassegoda, 11, 08028 Barcelona',
                latitude=41.375191, longitude=2.125832, website=None, phone_number='934400955',
                pick_up=True, delivery=False, image=image_util.decode_and_resize('test/mock/local_image_2.jpg'),
                category_id=category_service.get_id_by_name('Farmacia')
            ),
            Local(
                name='Panet Olzinelles', 
                description='El millor forn de pa del barri de sants.',
                postal_address='Carrer Olzinelles, 10, 08014 Barcelona',
                latitude=41.374300, 
                longitude=2.136234, 
                website='panet.cat', 
                phone_number='672642565',
                pick_up=True, delivery=False, 
                image=image_util.decode_and_resize('test/mock/panet.jpg'),
                category_id=category_service.get_id_by_name('Fleca')
            ),
            Local(
                name='FORN DE PA TOÑI DEGUSTACIÓ', 
                description='Forn de pa de sants, de tota la vida',
                postal_address='Baixos, Carrer Olzinelles, 103, 08014 Barcelona',
                latitude=41.370550, 
                longitude=2.137626, 
                website=None, 
                phone_number='933536486',
                pick_up=True, delivery=False, 
                image=image_util.decode_and_resize('test/mock/toni.jpg'),
                category_id=category_service.get_id_by_name('Fleca')
            ),
            Local(
                name='El Primo', 
                description='Forn de pa el Primo, vina i esmorza',
                postal_address='Carrer de Sants, 252, 08028 Barcelona',
                latitude=41.370550, 
                longitude=2.137626, 
                website=None, 
                phone_number='931265329',
                pick_up=True, delivery=False, 
                image=image_util.decode_and_resize('test/mock/primo.jpg'),
                category_id=category_service.get_id_by_name('Fleca')
            ),
            Local(
                name='Ferreteria J. Valls', 
                description='Ferreteria valls, tot el que et pugui fer falta',
                postal_address='Carrer de Sants, 172, 08028 Barcelona',
                latitude=41.375467, 
                longitude=2.132898, 
                website='optimusweb.es', 
                phone_number='933396001',
                pick_up=True, delivery=False, 
                image=image_util.decode_and_resize('test/mock/valls.jpg'),
                category_id=category_service.get_id_by_name('Ferreteria')
            ),
            Local(
                name='Ferreteria Hijano', 
                description='Ferreteria de tota la vida',
                postal_address='Carrer Progrés, 89, 08904 Hospitalet de Llobregat, Barcelona',
                latitude=41.371972, 
                longitude=2.121046, 
                website='cadena88.com', 
                phone_number='934401879',
                pick_up=True, delivery=False, 
                image=image_util.decode_and_resize('test/mock/hijano.jpg'),
                category_id=category_service.get_id_by_name('Ferreteria')
            ),
            Local(
                name='Ferretería Rodríguez', 
                description='On trobaràs totes les eines que necessitis',
                postal_address='Carrer de la Riera Blanca, 105, 08028 Hospitalet de Llobregat, Barcelona',
                latitude=41.372091, 
                longitude=2.126644, 
                website=None, 
                phone_number='931626903',
                pick_up=True, delivery=False, 
                image=image_util.decode_and_resize('test/mock/rodriguez.jpg'),
                category_id=category_service.get_id_by_name('Ferreteria')
            ),
            Local(
                name='Farmàcia Valentines Gelabert', 
                description='La teva farmàcia de confiança',
                postal_address='Carrer de Verdi, 7, 08012 Barcelona',
                latitude=41.403156, 
                longitude=2.157599, 
                website=None, 
                phone_number='932136301',
                pick_up=True, delivery=True, 
                image=image_util.decode_and_resize('test/mock/valentines.jpg'),
                category_id=category_service.get_id_by_name('Farmacia')
            ),
            Local(
                name='Cal Juny',
                description='Supermercat de tota la vida',
                postal_address='Carrer de les Camèlies, 7, 08024 Barcelona',
                latitude=41.410813,
                longitude=2.158631,
                website=None,
                phone_number='932103020',
                pick_up=True, delivery=False,
                image=image_util.decode_and_resize('test/mock/juny.jpg'),
                category_id=category_service.get_id_by_name('Supermercat')
            ),

        ]
        db_session().bulk_save_objects(object_list)
        db_session().commit()
    else:
        log.info(f'Skipping dummy data for {Local.__tablename__} because is not empty.')


def get(local_id):
    local = db_session().query(Local).filter_by(id=local_id).first()
    return local if local else None


def get_all():
    return db_session().query(Local).all()


def create(
        name, postal_address, user_id, latitude, longitude,
        description=None, website=None, phone_number=None, pick_up=True, delivery=False, category_id=None, image=None
):
    try:
        local = Local(
            name=name,
            description=description,
            postal_address=postal_address,
            latitude=latitude,
            longitude=longitude,
            website=website,
            phone_number=phone_number,
            pick_up=pick_up,
            delivery=delivery,
            image=image,
            category_id=category_id
        )
        if image:
            decoded_image = image_util.resize(image)
            if decoded_image:
                local.image = decoded_image
        db_session().add(local)
        db_session().commit()

        # Set local to user
        user = user_service.get(user_id)
        if user:
            user.local_id = local.id
            db_session().commit()

        return local.id, None
    except IntegrityError as e:
        return None, str(e.args[0]).replace('\n', ' ')


def get_id_by_name(name):
    local = db_session().query(Local).filter_by(name=name).first()
    return local.id


def get_all_coordinates():
    local_dict = dict()
    for local in db_session().query(Local).all():
        local_dict[local.id] = dict(latitude=local.latitude, longitude=local.longitude)
    return local_dict


def edit(
        local_id,
        name=None, description=None, postal_address=None, latitude=None, longitude=None,
        website=None, phone_number=None, pick_up=None, delivery=None, category=None, image=None
):
    local = get(local_id)
    if local:
        local.name = local.name if name is None else name
        local.description = local.description if description is None else description
        local.postal_address = local.postal_address if postal_address is None else postal_address
        local.latitude = local.latitude if latitude is None else latitude
        local.longitude = local.longitude if longitude is None else longitude
        local.website = local.website if website is None else website
        local.phone_number = local.phone_number if phone_number is None else phone_number
        local.pick_up = local.pick_up if pick_up is None else pick_up
        local.delivery = local.delivery if delivery is None else delivery
        local.category = local.category if category is None else category
        if image:
            decoded_image = image_util.resize(image)
            if decoded_image:
                local.image = decoded_image
        db_session().commit()
        return True
    else:
        return False


def get_tags(local_id):
    tags = []
    local = db_session().query(Local).filter_by(id=local_id).first()
    if local.pick_up:
        tags.append(TAG_LOCAL_PICK_UP)
    if local.delivery:
        tags.append(TAG_LOCAL_DELIVERY)
    if opening_hours_item_service.is_open(local_id):
        tags.append(TAG_LOCAL_OPEN)
    return tags


def get_from_id_list(local_id_list):
    local_list = []
    local_orm_list = db_session().query(Local).filter(Local.id.in_(local_id_list)).all()
    for local_orm in local_orm_list:
        local_list.append(dict(
            id=local_orm.id,
            name=local_orm.name,
            description=local_orm.description,
            category=None if not local_orm.category_id else local_orm.category.name,
            punctuation=review_local_service.get_average(local_orm.id),
            tags=get_tags(local_orm.id)
        ))
    return local_list
