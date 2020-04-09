import sqlalchemy as db

from sqlalchemy.orm import relationship

from src.db import helper
from src.db.sqlalchemy import Base
from src.enum.week_day import WeekDay
from src.model.local import Local


class OpeningHoursItem(Base):

    __tablename__ = 'compra_local_opening_hours_item'

    id = db.Column(db.Integer, helper.get_sequence(__tablename__), primary_key=True)
    week_day = db.Column(db.Enum(WeekDay), nullable=False)
    started_at = db.Column(db.DateTime(timezone=False), nullable=False)
    ended_at = db.Column(db.DateTime(timezone=False), nullable=False)
    local_id = db.Column(db.Integer, db.ForeignKey(f'{Local.__tablename__}.id'), nullable=False)

    category = relationship(Local.__name__)
