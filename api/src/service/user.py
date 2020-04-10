from sqlalchemy.exc import IntegrityError

from src.db.sqlalchemy import db_session
from src.enum.user_type import UserType
from src.helper import image as image_util, log
from src.model.user import User


def add_dummy_data():
    count = db_session().query(User.id).count()
    if count == 0:
        log.info(f'Adding dummy data for {User.__tablename__}...')
        object_list = [
            User(
                name='Albert Suarez', email_address='hi@albert.dev',
                password='72d0166b5707d129dc321e56692fe454c034552ee9e2b38f5a7f1c1306a632ea',
                type=UserType.client, image=image_util.decode_and_resize('test/mock/user_image_1.jpg')
            ),
            User(
                name='Andreu Gallofre', email_address='hi@andreu.dev',
                password='79f2653ff4301ea86f566d4e1f4dcbef74ad6b8dd0b47e564bf570007d50cd70',
                type=UserType.client, image=image_util.decode_and_resize('test/mock/user_image_2.jpg')
            ),
            User(
                name='Elena Ruiz', email_address='hi@elena.dev',
                password='0ce93c9606f0685bf60e051265891d256381f639d05c0aec67c84eec49d33cc1',
                type=UserType.business, image=image_util.decode_and_resize('test/mock/user_image_3.jpg')
            ),
            User(
                name='Carlota Catot', email_address='hi@carlota.dev',
                password='332b7c12e4832aa8241acb324f2deaa4cac7a522243d1f078259fac18873bcce',
                type=UserType.business, image=image_util.decode_and_resize('test/mock/user_image_4.jpg')
            )
        ]
        db_session().bulk_save_objects(object_list)
        db_session().commit()
    else:
        log.info(f'Skipping dummy data for {User.__tablename__} because is not empty.')


def get(user_id):
    user = db_session().query(User).filter_by(id=user_id).first()
    return user if user else None


def edit(user_id, name=None, email_address=None, image=None):
    user = get(user_id)
    if user:
        user.name = user.name if name is None else name
        user.email_address = user.email_address if email_address is None else email_address
        user.image = user.image if image is None else image
        db_session().commit()
        return True
    else:
        return False


def edit_password(user_id, new_password):
    user = get(user_id)
    if user:
        user.password = new_password
        db_session().commit()
        return True
    else:
        return False


def create(name, email_address, password, user_type, image=None):
    try:
        user = User(name=name, email_address=email_address, password=password, type=user_type)
        if image:
            decoded_image = image_util.resize(image)
            if decoded_image:
                user.image = decoded_image
        db_session().add(user)
        db_session().commit()
        return user.id, None
    except IntegrityError as e:
        return None, str(e.args[0]).replace('\n', ' ')


def login(user_type, email_address, password):
    user = db_session().query(User).filter_by(type=user_type, email_address=email_address, password=password).first()
    return None if not user else user.id
