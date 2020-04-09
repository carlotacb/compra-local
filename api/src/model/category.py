import sqlalchemy as db

from src.db import helper
from src.db.sqlalchemy import Base


class Category(Base):

    __tablename__ = 'compra_local_category'

    id = db.Column(db.Integer, helper.get_sequence(
        __tablename__), primary_key=True)
    name = db.Column(db.String(64), nullable=False)
