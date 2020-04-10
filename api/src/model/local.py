import sqlalchemy as db

from sqlalchemy.orm import relationship

from src.db import helper
from src.db.sqlalchemy import Base
from src.model.category import Category


class Local(Base):

    __tablename__ = 'compra_local_local'

    id = db.Column(db.Integer, helper.get_sequence(__tablename__), primary_key=True)
    name = db.Column(db.String(64), nullable=False)
    description = db.Column(db.String(256))
    postal_address = db.Column(db.String(256), nullable=False)
    latitude = db.Column(db.Float, nullable=False)
    longitude = db.Column(db.Float, nullable=False)
    website = db.Column(db.String(256))
    phone_number = db.Column(db.String(64))
    pick_up = db.Column(db.Boolean, nullable=False, default=True)
    delivery = db.Column(db.Boolean, nullable=False, default=False)
    image = db.Column(db.Text)
    category_id = db.Column(db.Integer, db.ForeignKey(f'{Category.__tablename__}.id'))

    category = relationship(Category.__name__)
