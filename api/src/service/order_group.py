from src.db.sqlalchemy import db_session
from src.enum.order_status import OrderGroupStatus
from src.helper import log
from src.model.order_group import OrderGroup
from src.service import user as user_service


def add_dummy_data():
    count = db_session().query(OrderGroup.id).count()
    if count == 0:
        log.info(f'Adding dummy data for {OrderGroup.__tablename__}...')
        object_list = [
            OrderGroup(
                completed=True, helper_needed=True, order_group_status=OrderGroupStatus.COMPLETED,
                user_id=user_service.get_id_by_name('Albert Suarez'),
                helper_id=user_service.get_id_by_name('Andreu Gallofre')
            ),
            OrderGroup(
                completed=False, helper_needed=True, order_group_status=OrderGroupStatus.PENDING_HELPER,
                user_id=user_service.get_id_by_name('Albert Suarez'),
                helper_id=user_service.get_id_by_name('Andreu Gallofre')
            ),
            OrderGroup(
                completed=False, helper_needed=False, order_group_status=OrderGroupStatus.PENDING_PICKUP,
                user_id=user_service.get_id_by_name('Andreu Gallofre'), helper_id=None
            )
        ]
        db_session().bulk_save_objects(object_list)
        db_session().commit()
    else:
        log.info(f'Skipping dummy data for {OrderGroup.__tablename__} because is not empty.')
