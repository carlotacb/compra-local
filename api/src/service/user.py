from sqlalchemy.exc import IntegrityError

from src.db.sqlalchemy import db_session
from src.helper import image as image_util, log
from src.model.user import User


def add_dummy_data():
    count = db_session().query(User.id).count()
    if count == 0:
        log.info(f'Adding dummy data for {User.__tablename__}...')
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
            encoded_image = image_util.resize(image)
            if encoded_image:
                user.image = encoded_image
        db_session().add(user)
        db_session().commit()
        return user.id, None
    except IntegrityError as e:
        return None, str(e.args[0]).replace('\n', ' ')


def login(user_type, email_address, password):
    user = db_session().query(User).filter_by(type=user_type, email_address=email_address, password=password).first()
    return None if not user else user.id
