from sqlalchemy.exc import IntegrityError

from src.db.sqlalchemy import db_session
from src.helper import image as image_util
from src.model.user import User


def get(user_id):
    user = db_session().query(User).filter_by(id=user_id).first()
    return user if user else None


def create(name, email_address, password, type, image=None):
    try:
        user = User(name=name, email_address=email_address, password=password, type=type)
        if image:
            encoded_image = image_util.resize(image)
            if encoded_image:
                user.image = encoded_image
        db_session().add(user)
        db_session().commit()
        return user.id, None
    except IntegrityError as e:
        return None, str(e.args[0]).replace('\n', ' ')
