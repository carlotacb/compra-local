from sqlalchemy import and_, true
from sqlalchemy.exc import IntegrityError

from src.db.sqlalchemy import db_session
from src.enum.order_status import OrderStatus, OrderGroupStatus
from src.enum.user_type import UserType
from src.helper import image as image_util, log
from src.model.order import Order
from src.model.order_group import OrderGroup
from src.model.review_local import ReviewLocal
from src.model.review_user import ReviewUser
from src.model.user import User
from src.service import local as local_service


def add_dummy_data():
    count = db_session().query(User.id).count()
    if count == 0:
        log.info(f'Adding dummy data for {User.__tablename__}...')
        object_list = [
            User(
                name='Albert Suarez', email_address='hi@albert.dev', phone_number='666555444',
                password='72d0166b5707d129dc321e56692fe454c034552ee9e2b38f5a7f1c1306a632ea',
                postal_address='Carrer de Sants, 282, 08028 Barcelona', latitude=41.375647, longitude=2.127905,
                type=UserType.client, image=image_util.decode_and_resize('test/mock/user_image_1.jpg')
            ),
            User(
                name='Andreu Gallofre', email_address='hi@andreu.dev', phone_number='654768980',
                password='79f2653ff4301ea86f566d4e1f4dcbef74ad6b8dd0b47e564bf570007d50cd70',
                postal_address='Carrer de Bassegoda, 11, 08028 Barcelona', latitude=41.375191, longitude=2.125832,
                type=UserType.client, image=image_util.decode_and_resize('test/mock/user_image_2.jpg')
            ),
            User(
                name='Elena Ruiz', email_address='hi@elena.dev', phone_number='769547606',
                password='0ce93c9606f0685bf60e051265891d256381f639d05c0aec67c84eec49d33cc1',
                postal_address='Carrer de Sants, 282, 08028 Barcelona', latitude=41.375647, longitude=2.127905,
                type=UserType.business, image=image_util.decode_and_resize('test/mock/user_image_3.jpg'),
                local_id=local_service.get_id_by_name('Farmacia Bassegoda')
            ),
            User(
                name='Carlota Catot', email_address='hi@carlota.dev', phone_number='665789123',
                password='332b7c12e4832aa8241acb324f2deaa4cac7a522243d1f078259fac18873bcce',
                postal_address='Carrer de Bassegoda, 11, 08028 Barcelona', latitude=41.375191, longitude=2.125832,
                type=UserType.business, image=image_util.decode_and_resize('test/mock/user_image_4.jpg'),
                local_id=local_service.get_id_by_name('Bona Fruita Busquets')
            ),
            User(
                name='Lola', email_address='hi@lola.dev', phone_number='665789002',
                password='47acf82a48cfa5c340ea536cdd66c75ef85eb8d3fcff468fc7c8abcaceb15ed0',
                postal_address='Carrer de Bassegoda, 11, 08028 Barcelona', latitude=41.375191, longitude=2.125832,
                type=UserType.business, image=None
            )
        ]
        db_session().bulk_save_objects(object_list)
        db_session().commit()
    else:
        log.info(f'Skipping dummy data for {User.__tablename__} because is not empty.')


def get_id_by_name(name):
    user = db_session().query(User).filter_by(name=name).first()
    return user.id


def get(user_id):
    user = db_session().query(User).filter_by(id=user_id).first()
    return user if user else None


def edit(
        user_id, name=None, email_address=None, phone_number=None,
        postal_address=None, latitude=None, longitude=None, image=None
):
    user = get(user_id)
    if user:
        user.name = user.name if name is None else name
        user.email_address = user.email_address if email_address is None else email_address
        if image:
            decoded_image = image_util.resize(image)
            if decoded_image:
                user.image = decoded_image
        user.phone_number = user.phone_number if phone_number is None else phone_number
        user.postal_address = user.postal_address if postal_address is None else postal_address
        user.latitude = user.latitude if latitude is None else latitude
        user.longitude = user.longitude if longitude is None else longitude
        user.image = user.image if image is None else image
        db_session().commit()
        return True
    else:
        return False


def edit_password(user_id, new_password):
    user = get(user_id)
    if user:
        user.password = new_password
        db_session().commit()
        return True
    else:
        return False


def create(
        name, email_address, password, user_type,
        postal_address=None, latitude=None, longitude=None, phone_number=None, image=None
):
    try:
        user = User(
            name=name,
            email_address=email_address,
            phone_number=phone_number,
            password=password,
            type=user_type,
            postal_address=postal_address,
            latitude=latitude,
            longitude=longitude
        )
        if image:
            decoded_image = image_util.resize(image)
            if decoded_image:
                user.image = decoded_image
        db_session().add(user)
        db_session().commit()
        return user.id, None
    except IntegrityError as e:
        return None, str(e.args[0]).replace('\n', ' ')


def login(user_type, email_address, password):
    user = db_session().query(User).filter_by(type=user_type, email_address=email_address, password=password).first()
    return None if not user else user.id


def check_password(user_id, password):
    user = db_session().query(User).filter_by(id=user_id, password=password).first()
    return False if not user else True


def get_pending_reviews(user_id):
    # Initialize result
    pending_reviews = list()
    # Get local reviews
    order_without_local_reviews_list = db_session().query(OrderGroup, Order).filter(and_(
        OrderGroup.id == Order.order_group_id,
        OrderGroup.user_id == user_id, Order.order_status == OrderStatus.COMPLETED,
        Order.id.notin_(db_session().query(ReviewLocal.order_id).all())
    )).all()
    for item in order_without_local_reviews_list:
        pending_reviews.append(dict(
            order_group_id=None, order_id=item[1].id,
            local_name=item[1].local.name, user_name=None, type=UserType.business.value
        ))
    # Get user reviews
    order_group_without_user_reviews_list = db_session().query(OrderGroup).filter(and_(
        OrderGroup.user_id == user_id, OrderGroup.order_group_status == OrderGroupStatus.COMPLETED,
        OrderGroup.helper_needed == true(),
        OrderGroup.id.notin_(db_session().query(ReviewUser.order_group_id).all())
    )).all()
    for item in order_group_without_user_reviews_list:
        pending_reviews.append(dict(
            order_group_id=item.id, order_id=None,
            local_name=None, user_name=item.helper.name, type=UserType.client.value
        ))
    # Return
    return pending_reviews


def get_done_reviews(user_id):
    # Initialize result
    done_reviews = list()
    # Get local reviews
    local_review_list = db_session().query(ReviewLocal).filter_by(writer_id=user_id).all()
    for review_orm in local_review_list:
        done_reviews.append(dict(
            punctuation=review_orm.punctuation,
            comment=review_orm.comment,
            destination=review_orm.local.name
        ))
    # Get user reviews
    user_review_list = db_session().query(ReviewUser).filter_by(writer_id=user_id).all()
    for review_orm in user_review_list:
        done_reviews.append(dict(
            punctuation=review_orm.punctuation,
            comment=review_orm.comment,
            destination=review_orm.user.name
        ))
    # Return
    return done_reviews
