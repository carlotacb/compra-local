import datetime
import sqlalchemy as db

from sqlalchemy.orm import relationship

from src.db import helper
from src.db.sqlalchemy import Base
from src.model.local import Local
from src.model.order_group import OrderGroup


class Order(Base):

    __tablename__ = 'compra_local_order'

    id = db.Column(db.Integer, helper.get_sequence(__tablename__), primary_key=True)
    completed_time = db.Column(db.DateTime(timezone=False), nullable=False, default=datetime.datetime.utcnow())
    local_id = db.Column(db.Integer, db.ForeignKey(f'{Local.__tablename__}.id'), nullable=False)
    order_group_id = db.Column(db.Integer, db.ForeignKey(f'{OrderGroup.__tablename__}.id'), nullable=False)

    local = relationship(Local.__name__)
    order_group = relationship(OrderGroup.__name__)
