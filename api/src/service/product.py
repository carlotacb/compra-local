from src.db.sqlalchemy import db_session
from src.enum.currency import Currency
from src.enum.price_type import PriceType
from src.helper import log
from src.model.product import Product
from src.service import local as local_service
from src.service import product_group as product_group_service


def add_dummy_data():
    count = db_session().query(Product.id).count()
    if count == 0:
        log.info(f'Adding dummy data for {Product.__tablename__}...')
        object_list = [
            Product(
                name='Poma', description='Origen: Andalucia', price=1.5, currency=Currency.EUR,
                price_type=PriceType.KILOGRAM, local_id=local_service.get_id_by_name('Bona Fruita Busquets'),
                product_group_id=product_group_service.get_id_by_name_and_local_name('Fruita', 'Bona Fruita Busquets')
            ),
            Product(
                name='Platan', description='Origen: Canaries', price=0.9, currency=Currency.EUR,
                price_type=PriceType.KILOGRAM, local_id=local_service.get_id_by_name('Bona Fruita Busquets'),
                product_group_id=product_group_service.get_id_by_name_and_local_name('Fruita', 'Bona Fruita Busquets')
            ),
            Product(
                name='Pebrot', description='Origen: Catalunya', price=0.3, currency=Currency.EUR,
                price_type=PriceType.UNIT, local_id=local_service.get_id_by_name('Bona Fruita Busquets'),
                product_group_id=product_group_service.get_id_by_name_and_local_name('Verdura', 'Bona Fruita Busquets')
            ),
            Product(
                name='Ibuprofeno', description='Per curar el mal de cap', price=4.5, currency=Currency.EUR,
                price_type=PriceType.UNIT, local_id=local_service.get_id_by_name('Farmacia Bassegoda'),
                product_group_id=product_group_service.get_id_by_name_and_local_name('Medicina', 'Farmacia Bassegoda')
            ),
            Product(
                name='Diprogenta', description='Per curar les cremades', price=6, currency=Currency.EUR,
                price_type=PriceType.UNIT, local_id=local_service.get_id_by_name('Farmacia Bassegoda'),
                product_group_id=product_group_service.get_id_by_name_and_local_name('Crema', 'Farmacia Bassegoda')
            )
        ]
        db_session().bulk_save_objects(object_list)
        db_session().commit()
    else:
        log.info(f'Skipping dummy data for {Product.__tablename__} because is not empty.')
