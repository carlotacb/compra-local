import sqlalchemy as db

from sqlalchemy.orm import relationship

from src.db import helper
from src.db.sqlalchemy import Base
from src.enum.user_type import UserType
from src.model.local import Local


class User(Base):

    __tablename__ = 'compra_local_user'

    id = db.Column(db.Integer, helper.get_sequence(__tablename__), primary_key=True)
    name = db.Column(db.String(64), nullable=False)
    email_address = db.Column(db.String(128), nullable=False, unique=True)
    password = db.Column(db.String(256), nullable=False)
    phone_number = db.Column(db.String(64))
    postal_address = db.Column(db.String(256), nullable=False)
    latitude = db.Column(db.Float, nullable=False)
    longitude = db.Column(db.Float, nullable=False)
    type = db.Column(db.Enum(UserType), nullable=False)
    image = db.Column(db.Text)
    local_id = db.Column(db.Integer, db.ForeignKey(f'{Local.__tablename__}.id'))

    local = relationship(Local.__name__)

    def serialize(self):
        return dict(
            id=self.id,
            name=self.name,
            email_address=self.email_address,
            phone_number=self.phone_number,
            postal_address=self.postal_address,
            latitude=self.latitude,
            longitude=self.longitude,
            type=self.type.value,
            image=self.image,
            local_id=self.local_id
        )
