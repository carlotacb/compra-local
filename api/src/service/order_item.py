from src.db.sqlalchemy import db_session
from src.helper import log
from src.model.order_item import OrderItem
from src.service import product as product_service


def add_dummy_data():
    count = db_session().query(OrderItem.id).count()
    if count == 0:
        log.info(f'Adding dummy data for {OrderItem.__tablename__}...')
        object_list = [
            OrderItem(
                quantity=1, order_id=1,
                product_id=product_service.get_id_by_name_and_local_name('Poma', 'Bona Fruita Busquets')
            ),
            OrderItem(
                quantity=4, order_id=1,
                product_id=product_service.get_id_by_name_and_local_name('Pebrot', 'Bona Fruita Busquets')
            ),
            OrderItem(
                quantity=2, order_id=2,
                product_id=product_service.get_id_by_name_and_local_name('Ibuprofeno', 'Farmacia Bassegoda')
            ),
            OrderItem(
                quantity=0.8, order_id=3,
                product_id=product_service.get_id_by_name_and_local_name('Platan', 'Bona Fruita Busquets')
            ),
            OrderItem(
                quantity=1, order_id=4,
                product_id=product_service.get_id_by_name_and_local_name('Diprogenta', 'Farmacia Bassegoda')
            ),
            OrderItem(
                quantity=1.2, order_id=5,
                product_id=product_service.get_id_by_name_and_local_name('Platan', 'Bona Fruita Busquets')
            ),
        ]
        db_session().bulk_save_objects(object_list)
        db_session().commit()
    else:
        log.info(f'Skipping dummy data for {OrderItem.__tablename__} because is not empty.')
