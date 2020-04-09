import sqlalchemy as db

from sqlalchemy.orm import relationship

from src.db import helper
from src.db.sqlalchemy import Base
from src.model.local import Local


class ProductGroup(Base):

    __tablename__ = 'compra_local_product_group'

    id = db.Column(db.Integer, helper.get_sequence(
        __tablename__), primary_key=True)
    name = db.Column(db.String(64), nullable=False)
    local_id = db.Column(db.Integer, db.ForeignKey(
        f'{Local.__tablename__}.id'), nullable=False)

    category = relationship(Local.__name__)
