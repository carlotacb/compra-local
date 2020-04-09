import sqlalchemy as db

from sqlalchemy.orm import relationship

from src.db import helper
from src.db.sqlalchemy import Base
from src.model.local import Local
from src.model.order import Order
from src.model.user import User


class ReviewLocal(Base):

    __tablename__ = 'compra_local_review_local'

    id = db.Column(db.Integer, helper.get_sequence(
        __tablename__), primary_key=True)
    punctuation = db.Column(db.Integer, nullable=False)
    comment = db.Column(db.String(256))
    writer_id = db.Column(db.Integer, db.ForeignKey(
        f'{User.__tablename__}.id'), nullable=False)
    local_id = db.Column(db.Integer, db.ForeignKey(
        f'{Local.__tablename__}.id'), nullable=False)
    order_id = db.Column(db.Integer, db.ForeignKey(
        f'{Order.__tablename__}.id'), nullable=False)

    writer = relationship(User.__name__)
    local = relationship(Local.__name__)
    order = relationship(Order.__name__)
