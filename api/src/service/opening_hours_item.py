from datetime import datetime

from sqlalchemy import and_

from src.config import DATE_TIME_FORMAT, DATE_WEEK_DAY_FORMAT
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


def is_open(local_id):
    now = datetime.utcnow()
    now_week_day = WeekDay(now.strftime(DATE_WEEK_DAY_FORMAT).upper())
    now_day_time = datetime.strptime(now.strftime(DATE_TIME_FORMAT), DATE_TIME_FORMAT)
    open_hours_item = db_session().query(OpeningHoursItem).filter(and_(
        OpeningHoursItem.local_id == local_id, OpeningHoursItem.week_day == now_week_day,
        OpeningHoursItem.started_at < now_day_time, OpeningHoursItem.ended_at > now_day_time
    )).first()
    return bool(open_hours_item)


def get(local_id):
    opening_list = list()
    opening_hours_list = db_session().query(OpeningHoursItem).filter_by(local_id=local_id).all()
    for opening_hour in opening_hours_list:
        opening_list.append(dict(
            id=opening_hour.id,
            week_day=opening_hour.week_day.value,
            started_at=opening_hour.started_at.strftime("%H:%M"),
            ended_at=opening_hour.ended_at.strftime("%H:%M")
        ))
    return opening_list


def post(local_id, opening_hours_list):
    opening_list = list()
    db_session().query(OpeningHoursItem).filter_by(local_id=local_id).delete()
    try:
        for opening_hours in opening_hours_list:
            opening_list.append(
                OpeningHoursItem(
                    week_day=WeekDay(opening_hours.get('week_day').upper()),
                    started_at=datetime.strptime(opening_hours.get('started_at'), DATE_TIME_FORMAT),
                    ended_at=datetime.strptime(opening_hours.get('ended_at'), DATE_TIME_FORMAT),
                    local_id=local_id
                )
            )
        db_session().bulk_save_objects(opening_list)
        db_session().commit()
        return True
    except Exception as e:
        print('exception ' + str(e))
        return False
