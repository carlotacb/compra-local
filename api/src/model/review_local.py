import sqlalchemy as db

from sqlalchemy.orm import relationship

from src.db import helper
from src.model.local import Local
from src.model.order import Order
from src.model.review import Review


class ReviewLocal(Review):

    __tablename__ = 'compra_local_review_local'

    id = db.Column(db.Integer, helper.get_sequence(__tablename__), primary_key=True)
    local_id = db.Column(db.Integer, db.ForeignKey(f'{Local.__tablename__}.id'), nullable=False)
    order_id = db.Column(db.Integer, db.ForeignKey(f'{Order.__tablename__}.id'), nullable=False)

    local = relationship(Local.__name__)
    order = relationship(Order.__name__)
