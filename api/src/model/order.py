import datetime
import sqlalchemy as db

from sqlalchemy.orm import relationship

from src.db import helper
from src.db.sqlalchemy import Base
from src.model.local import Local
from src.enum.order_status import OrderStatus
from src.model.order_group import OrderGroup


class Order(Base):

    __tablename__ = 'compra_local_order'

    id = db.Column(db.Integer, helper.get_sequence(__tablename__), primary_key=True)
    completed_time = db.Column(db.DateTime(timezone=False), nullable=False, default=datetime.datetime.utcnow())
    pick_up = db.Column(db.Boolean, nullable=False, default=True)
    delivery = db.Column(db.Boolean, nullable=False, default=False)
    local_id = db.Column(db.Integer, db.ForeignKey(f'{Local.__tablename__}.id'), nullable=False)
    order_group_id = db.Column(db.Integer, db.ForeignKey(f'{OrderGroup.__tablename__}.id'), nullable=False)
    order_status = db.Column(db.Enum(OrderStatus), nullable=False, default=OrderStatus.PENDING_STORE)

    local = relationship(Local.__name__)
    order_group = relationship(OrderGroup.__name__)
