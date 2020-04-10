from sqlalchemy.exc import IntegrityError

from src.db.sqlalchemy import db_session
from src.model.local import Local


def get(local_id):
    local = db_session().query(Local).filter_by(id=local_id).first()
    return local if local else None


def create(name, description, postal_address, latitude, longitude, website, phone_number 
           pick_up, delivery, image=None, category):
    try:
        local = Local(name=name, description=description, 
                      postal_address=postal_address, latitude=latitude,
                      longitude=longitude, website=website, phone_number=phone_number,
                      pick_up=pick_up, delivery=delivery, image=image,
                      category_id=category_id)
        if image:
            encoded_image = image_util.resize(image)
            if encoded_image:
                user.image = encoded_image
        db_session().add(local)
        db_session().commit()
        return local.id, None
    except IntegrityError as e:
        return None, str(e.args[0]).replace('\n', ' ')