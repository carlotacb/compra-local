import sqlalchemy as db

from sqlalchemy.orm import relationship

from src.db import helper
from src.db.sqlalchemy import Base
from src.model.order import Order
from src.model.product import Product


class OrderItem(Base):

    __tablename__ = 'compra_local_order_item'

    id = db.Column(db.Integer, helper.get_sequence(__tablename__), primary_key=True)
    quantity = db.Column(db.Float, nullable=False)
    product_id = db.Column(db.Integer, db.ForeignKey(f'{Product.__tablename__}.id'), nullable=False)
    order_id = db.Column(db.Integer, db.ForeignKey(f'{Order.__tablename__}.id'), nullable=False)

    product = relationship(Product.__name__)
    order = relationship(Order.__name__)
