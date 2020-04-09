import sqlalchemy as db

from abc import ABC
from sqlalchemy.orm import relationship

from src.db.sqlalchemy import Base
from src.model.user import User


class Review(ABC, Base):

    punctuation = db.Column(db.Integer)
    comment = db.Column(db.String(256))
    writer_id = db.Column(db.Integer, db.ForeignKey(f'{User.__tablename__}.id'), nullable=False)

    writer = relationship(User.__name__)
