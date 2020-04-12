from sqlalchemy import and_

from src.db.sqlalchemy import db_session
from src.helper import log
from src.model.local import Local
from src.model.product_group import ProductGroup
from src.service import local as local_service


def add_dummy_data():
    count = db_session().query(ProductGroup.id).count()
    if count == 0:
        log.info(f'Adding dummy data for {ProductGroup.__tablename__}...')
        object_list = [
            ProductGroup(name='Fruita', local_id=local_service.get_id_by_name('Bona Fruita Busquets')),
            ProductGroup(name='Verdura', local_id=local_service.get_id_by_name('Bona Fruita Busquets')),
            ProductGroup(name='Medicina', local_id=local_service.get_id_by_name('Farmacia Bassegoda')),
            ProductGroup(name='Crema', local_id=local_service.get_id_by_name('Farmacia Bassegoda')),
            ProductGroup(name='Pa', local_id=local_service.get_id_by_name('Panet Olzinelles')),
            ProductGroup(name='Passtiseria', local_id=local_service.get_id_by_name('Panet Olzinelles')),
            ProductGroup(name='Pa', local_id=local_service.get_id_by_name('FORN DE PA TOÑI DEGUSTACIÓ')),
            ProductGroup(name='Passtiseria', local_id=local_service.get_id_by_name('FORN DE PA TOÑI DEGUSTACIÓ')),
            ProductGroup(name='Pa', local_id=local_service.get_id_by_name('El Primo')),
            ProductGroup(name='Passtiseria', local_id=local_service.get_id_by_name('El Primo')),
        ]
        db_session().bulk_save_objects(object_list)
        db_session().commit()
    else:
        log.info(f'Skipping dummy data for {ProductGroup.__tablename__} because is not empty.')


def get_id_by_name_and_local_name(name, local_name):
    product_group = db_session().query(ProductGroup, Local).filter(
        and_(Local.id == ProductGroup.local_id, ProductGroup.name == name, Local.name == local_name)
    ).first()
    return product_group[0].id
