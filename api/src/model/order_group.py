import sqlalchemy as db

from sqlalchemy.orm import relationship

from src.db import helper
from src.db.sqlalchemy import Base
from src.model.user import User


class OrderGroup(Base):

    __tablename__ = 'compra_local_order_group'

    id = db.Column(db.Integer, helper.get_sequence(__tablename__), primary_key=True)
    helper_needed = db.Column(db.Boolean, nullable=False, default=False)
    user_id = db.Column(db.Integer, db.ForeignKey(f'{User.__tablename__}.id'), nullable=False)
    helper_id = db.Column(db.Integer, db.ForeignKey(f'{User.__tablename__}.id'))

    user = relationship(User.__name__, foreign_keys=[user_id])
    helper = relationship(User.__name__, foreign_keys=[helper_id])
