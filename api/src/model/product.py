import sqlalchemy as db

from sqlalchemy.orm import relationship

from src.db import helper
from src.db.sqlalchemy import Base
from src.enum.currency import Currency
from src.enum.price_type import PriceType
from src.model.local import Local
from src.model.product_group import ProductGroup


class Product(Base):

    __tablename__ = 'compra_local_product'

    id = db.Column(db.Integer, helper.get_sequence(__tablename__), primary_key=True)
    name = db.Column(db.String(64), nullable=False)
    description = db.Column(db.String(256))
    price = db.Column(db.Float, nullable=False)
    currency = db.Column(db.Enum(Currency), nullable=False, default=Currency.EUR)
    price_type = db.Column(db.Enum(PriceType), nullable=False, default=PriceType.UNIT)
    local_id = db.Column(db.Integer, db.ForeignKey(f'{Local.__tablename__}.id'), nullable=False)
    product_group_id = db.Column(db.Integer, db.ForeignKey(f'{ProductGroup.__tablename__}.id'))

    local = relationship(Local.__name__)
    category = relationship(ProductGroup.__name__)
