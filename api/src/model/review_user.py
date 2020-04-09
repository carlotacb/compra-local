import sqlalchemy as db

from sqlalchemy.orm import relationship

from src.db import helper
from src.model.order_group import OrderGroup
from src.model.user import User
from src.model.review import Review


class ReviewLocal(Review):

    __tablename__ = 'compra_local_review_user'

    id = db.Column(db.Integer, helper.get_sequence(__tablename__), primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey(f'{User.__tablename__}.id'), nullable=False)
    order_group_id = db.Column(db.Integer, db.ForeignKey(f'{OrderGroup.__tablename__}.id'), nullable=False)

    user = relationship(User.__name__)
    order_group = relationship(OrderGroup.__name__)
