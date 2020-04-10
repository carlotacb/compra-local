from datetime import datetime

from src.config import DATE_TIME_FORMAT
from src.db.sqlalchemy import db_session
from src.enum.week_day import WeekDay
from src.helper import log
from src.model.opening_hours_item import OpeningHoursItem
from src.service import local as local_service


def add_dummy_data():
    count = db_session().query(OpeningHoursItem.id).count()
    if count == 0:
        log.info(f'Adding dummy data for {OpeningHoursItem.__tablename__}...')
        object_list = [
            OpeningHoursItem(
                week_day=WeekDay.monday,
                started_at=datetime.strptime('08:00', DATE_TIME_FORMAT),
                ended_at=datetime.strptime('19:00', DATE_TIME_FORMAT),
                local_id=local_service.get_id_by_name('Bona Fruita Busquets')
            ),
            OpeningHoursItem(
                week_day=WeekDay.tuesday,
                started_at=datetime.strptime('08:00', DATE_TIME_FORMAT),
                ended_at=datetime.strptime('19:00', DATE_TIME_FORMAT),
                local_id=local_service.get_id_by_name('Bona Fruita Busquets')
            ),
            OpeningHoursItem(
                week_day=WeekDay.wednesday,
                started_at=datetime.strptime('08:00', DATE_TIME_FORMAT),
                ended_at=datetime.strptime('19:00', DATE_TIME_FORMAT),
                local_id=local_service.get_id_by_name('Bona Fruita Busquets')
            ),
            OpeningHoursItem(
                week_day=WeekDay.thursday,
                started_at=datetime.strptime('08:00', DATE_TIME_FORMAT),
                ended_at=datetime.strptime('19:00', DATE_TIME_FORMAT),
                local_id=local_service.get_id_by_name('Bona Fruita Busquets')
            ),
            OpeningHoursItem(
                week_day=WeekDay.friday,
                started_at=datetime.strptime('08:00', DATE_TIME_FORMAT),
                ended_at=datetime.strptime('19:00', DATE_TIME_FORMAT),
                local_id=local_service.get_id_by_name('Bona Fruita Busquets')
            ),
            OpeningHoursItem(
                week_day=WeekDay.saturday,
                started_at=datetime.strptime('10:00', DATE_TIME_FORMAT),
                ended_at=datetime.strptime('20:00', DATE_TIME_FORMAT),
                local_id=local_service.get_id_by_name('Farmacia Bassegoda')
            ),
            OpeningHoursItem(
                week_day=WeekDay.sunday,
                started_at=datetime.strptime('10:00', DATE_TIME_FORMAT),
                ended_at=datetime.strptime('20:00', DATE_TIME_FORMAT),
                local_id=local_service.get_id_by_name('Farmacia Bassegoda')
            )
        ]
        db_session().bulk_save_objects(object_list)
        db_session().commit()
    else:
        log.info(f'Skipping dummy data for {OpeningHoursItem.__tablename__} because is not empty.')
