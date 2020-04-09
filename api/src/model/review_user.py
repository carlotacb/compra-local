import sqlalchemy as db

from sqlalchemy.orm import relationship

from src.db import helper
from src.db.sqlalchemy import Base
from src.model.order_group import OrderGroup
from src.model.user import User


class ReviewUser(Base):

    __tablename__ = 'compra_local_review_user'

    id = db.Column(
        db.Integer,
        helper.get_sequence(__tablename__),
        primary_key=True)
    punctuation = db.Column(db.Integer, nullable=False)
    comment = db.Column(db.String(256))
    writer_id = db.Column(db.Integer, db.ForeignKey(
        f'{User.__tablename__}.id'), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey(
        f'{User.__tablename__}.id'), nullable=False)
    order_group_id = db.Column(db.Integer, db.ForeignKey(
        f'{OrderGroup.__tablename__}.id'), nullable=False)

    writer = relationship(User.__name__, foreign_keys=[writer_id])
    user = relationship(User.__name__, foreign_keys=[user_id])
    order_group = relationship(OrderGroup.__name__)
