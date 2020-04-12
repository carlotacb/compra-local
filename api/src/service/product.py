from sqlalchemy import and_
from sqlalchemy.exc import IntegrityError

from src.db.sqlalchemy import db_session
from src.enum.currency import Currency
from src.enum.price_type import PriceType
from src.helper import log
from src.model.local import Local
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
            ),
            Product(
                name='Pa', 
                description='Origen: Catalunya', 
                price=1, 
                currency=Currency.EUR,
                price_type=PriceType.KILOGRAM, 
                local_id=local_service.get_id_by_name('Panet Olzinelles'),
                product_group_id=product_group_service.get_id_by_name_and_local_name('Pa', 'Panet Olzinelles')
            ),
            Product(
                name='Crusanets', 
                description='Origen: Catalunya', 
                price=15, 
                currency=Currency.EUR,
                price_type=PriceType.KILOGRAM, 
                local_id=local_service.get_id_by_name('Panet Olzinelles'),
                product_group_id=product_group_service.get_id_by_name_and_local_name('Passtiseria', 'Panet Olzinelles')
            ),
            Product(
                name='Ensaimades', 
                description='Origen: Catalunya', 
                price=0.75, 
                currency=Currency.EUR,
                price_type=PriceType.UNIT, 
                local_id=local_service.get_id_by_name('Panet Olzinelles'),
                product_group_id=product_group_service.get_id_by_name_and_local_name('Passtiseria', 'Panet Olzinelles')
            ),
            Product(
                name='Pa de Pagès', 
                description='Origen: Catalunya', 
                price=1.5, 
                currency=Currency.EUR,
                price_type=PriceType.UNIT, 
                local_id=local_service.get_id_by_name('Panet Olzinelles'),
                product_group_id=product_group_service.get_id_by_name_and_local_name('Pa', 'Panet Olzinelles')
            ),
            Product(
                name='Pa', 
                description='Origen: Catalunya', 
                price=1, 
                currency=Currency.EUR,
                price_type=PriceType.KILOGRAM, 
                local_id=local_service.get_id_by_name('FORN DE PA TOÑI DEGUSTACIÓ'),
                product_group_id=product_group_service.get_id_by_name_and_local_name('Pa', 'FORN DE PA TOÑI DEGUSTACIÓ')
            ),
            Product(
                name='Crusanets', 
                description='Origen: Catalunya', 
                price=15, 
                currency=Currency.EUR,
                price_type=PriceType.KILOGRAM, 
                local_id=local_service.get_id_by_name('FORN DE PA TOÑI DEGUSTACIÓ'),
                product_group_id=product_group_service.get_id_by_name_and_local_name('Passtiseria', 'FORN DE PA TOÑI DEGUSTACIÓ')
            ),
            Product(
                name='Ensaimades', 
                description='Origen: Catalunya', 
                price=0.75, 
                currency=Currency.EUR,
                price_type=PriceType.UNIT, 
                local_id=local_service.get_id_by_name('FORN DE PA TOÑI DEGUSTACIÓ'),
                product_group_id=product_group_service.get_id_by_name_and_local_name('Passtiseria', 'FORN DE PA TOÑI DEGUSTACIÓ')
            ),
            Product(
                name='Pa de Pagès', 
                description='Origen: Catalunya', 
                price=1.5, 
                currency=Currency.EUR,
                price_type=PriceType.UNIT, 
                local_id=local_service.get_id_by_name('FORN DE PA TOÑI DEGUSTACIÓ'),
                product_group_id=product_group_service.get_id_by_name_and_local_name('Pa', 'FORN DE PA TOÑI DEGUSTACIÓ')
            ),
            Product(
                name='Pa', 
                description='Origen: Catalunya', 
                price=1, 
                currency=Currency.EUR,
                price_type=PriceType.KILOGRAM, 
                local_id=local_service.get_id_by_name('El Primo'),
                product_group_id=product_group_service.get_id_by_name_and_local_name('Pa', 'El Primo')
            ),
            Product(
                name='Crusanets', 
                description='Origen: Catalunya', 
                price=15, 
                currency=Currency.EUR,
                price_type=PriceType.KILOGRAM, 
                local_id=local_service.get_id_by_name('El Primo'),
                product_group_id=product_group_service.get_id_by_name_and_local_name('Passtiseria', 'El Primo')
            ),
            Product(
                name='Ensaimades', 
                description='Origen: Catalunya', 
                price=0.75, 
                currency=Currency.EUR,
                price_type=PriceType.UNIT, 
                local_id=local_service.get_id_by_name('El Primo'),
                product_group_id=product_group_service.get_id_by_name_and_local_name('Passtiseria', 'El Primo')
            ),
            Product(
                name='Pa de Pagès', 
                description='Origen: Catalunya', 
                price=1.5, 
                currency=Currency.EUR,
                price_type=PriceType.UNIT, 
                local_id=local_service.get_id_by_name('El Primo'),
                product_group_id=product_group_service.get_id_by_name_and_local_name('Pa', 'El Primo')
            ),
        ]
        db_session().bulk_save_objects(object_list)
        db_session().commit()
    else:
        log.info(f'Skipping dummy data for {Product.__tablename__} because is not empty.')


def get_id_by_name_and_local_name(name, local_name):
    product = db_session().query(Product, Local).filter(
        and_(Local.id == Product.local_id, Product.name == name, Local.name == local_name)
    ).first()
    return product[0].id


def get_all(local_id):
    product_list = list()
    product_orm_list = db_session().query(Product).filter_by(local_id=local_id).all()
    for product_orm in product_orm_list:
        product_list.append(dict(
            id=product_orm.id,
            name=product_orm.name,
            price=product_orm.price,
            description=product_orm.description,
            currency=product_orm.currency.value,
            price_type=product_orm.price_type.value,
            product_group_id=product_orm.product_group_id,
        ))
    return product_list


def get_product(local_id, product_id):
    product = db_session().query(Product).filter(
        and_(local_id == Product.local_id, Product.id == product_id)
    ).first()
    return product


def create(name, price, local_id, currency, price_type, product_group, description):
    try:
        prodcut = Product(
            name=name,
            description=description,
            price=price,
            currency=currency,
            price_type=price_type,
            product_group_id=product_group,
            local_id=local_id,
        )

        db_session().add(prodcut)
        db_session().commit()

        return prodcut.id, None
    except IntegrityError as e:
        return None, str(e.args[0]).replace('\n', ' ')


def edit(
        local_id, product_id,
        name=None, price=None, currency=None, price_type=None, description=None, product_group=None
):
    product = get_product(local_id, product_id)

    if product:
        product.name = product.name if name is None else name
        product.price = product.price if price is None else price
        product.currency = product.currency if currency is None else currency
        product.price_type = product.price_type if price_type is None else price_type
        product.description = product.description if description is None else description
        product.product_group_id = product.product_group_id if product_group is None else product_group
        db_session().commit()
        return True
    else:
        return False


def delete(local_id, product_id):
    product = get_product(local_id, product_id)

    if product:
        db_session().delete(product)
        db_session().commit()
        return True
    else:
        return False
