import sqlalchemy as db

from src.db import helper
from src.db.sqlalchemy import Base
from src.enum.user_type import UserType


class User(Base):

    __tablename__ = 'compra_local_user'

    id = db.Column(db.Integer, helper.get_sequence(__tablename__), primary_key=True)
    name = db.Column(db.String(64), nullable=False)
    email_address = db.Column(db.String(128), nullable=False)
    password = db.Column(db.String(256), nullable=False)
    type = db.Column(db.Enum(UserType), nullable=False)
