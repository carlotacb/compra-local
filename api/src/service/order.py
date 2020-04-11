from src.db.sqlalchemy import db_session
from src.enum.order_status import OrderStatus
from src.helper import log
from src.model.order import Order
from src.service import local as local_service


def add_dummy_data():
    count = db_session().query(Order.id).count()
    if count == 0:
        log.info(f'Adding dummy data for {Order.__tablename__}...')
        object_list = [
            Order(
                local_id=local_service.get_id_by_name('Bona Fruita Busquets'),
                order_group_id=1, order_status=OrderStatus.COMPLETED
            ),
            Order(
                local_id=local_service.get_id_by_name('Farmacia Bassegoda'),
                order_group_id=1, order_status=OrderStatus.COMPLETED
            ),
            Order(
                local_id=local_service.get_id_by_name('Bona Fruita Busquets'),
                order_group_id=2, order_status=OrderStatus.PENDING_HELPER
            ),
            Order(
                local_id=local_service.get_id_by_name('Farmacia Bassegoda'),
                order_group_id=3, order_status=OrderStatus.PENDING_PICKUP
            )
        ]
        db_session().bulk_save_objects(object_list)
        db_session().commit()
    else:
        log.info(f'Skipping dummy data for {Order.__tablename__} because is not empty.')


def get(order_id):
    order = db_session().query(Order).filter_by(id=order_id).first()
    return order if order else None
