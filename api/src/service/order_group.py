from sqlalchemy import and_, true

from src.config import DATE_FORMAT
from src.db.sqlalchemy import db_session
from src.enum.order_status import OrderGroupStatus, OrderStatus
from src.helper import log
from src.model.order import Order
from src.model.order_group import OrderGroup
from src.service import order as order_service
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
                user_id=user_service.get_id_by_name('Albert Suarez'), helper_id=None
            ),
            OrderGroup(
                completed=False, helper_needed=False, order_group_status=OrderGroupStatus.PENDING_PICKUP,
                user_id=user_service.get_id_by_name('Andreu Gallofre'), helper_id=None
            ),
            OrderGroup(
                completed=True, helper_needed=True, order_group_status=OrderGroupStatus.COMPLETED,
                user_id=user_service.get_id_by_name('Andreu Gallofre'),
                helper_id=user_service.get_id_by_name('Albert Suarez')
            ),
        ]
        db_session().bulk_save_objects(object_list)
        db_session().commit()
    else:
        log.info(f'Skipping dummy data for {OrderGroup.__tablename__} because is not empty.')


def get(order_group_id):
    order_group = db_session().query(OrderGroup).filter_by(id=order_group_id).first()
    return order_group if order_group else None


def get_helper_needed_by_local(local_id_list):
    helper_dict = dict()
    order_group_list = db_session().query(OrderGroup, Order).filter(and_(
        OrderGroup.id == Order.order_group_id, OrderGroup.helper_needed == true(),
        OrderGroup.helper_id.is_(None), Order.local_id.in_(local_id_list)
    )).all()
    for item in order_group_list:
        order_group = item[0]
        order = item[1]
        if order_group.id not in helper_dict:
            helper_dict[order_group.id] = dict(user=order_group.user.serialize(), order_list=list())
        helper_dict[order_group.id]['order_list'].append(dict(
            id=order.local.id, name=order.local.name, postal_address=order.local.postal_address,
            total=order_service.compute_total_price(order.id), status=order.order_status.value
        ))
    helper_list = list()
    for order_group_id, helper_content in helper_dict.items():
        helper_content['id'] = order_group_id
        helper_content['total'] = sum(o.get('total', 0.0) for o in helper_content.get('order_list', []))
        helper_list.append(helper_content)
    return helper_list


def set_order_status_by_group(order_group_id, order_status):
    for order in db_session().query(Order).filter_by(order_group_id=order_group_id).all():
        order.order_status = order_status
    db_session().commit()


def assign(user_id, order_group_object):
    order_group_object.helper_id = user_id
    order_group_object.order_group_status = OrderGroupStatus.PENDING_PICKUP
    db_session().commit()
    set_order_status_by_group(order_group_object.id, OrderStatus.PENDING_HELPER)
    return True


def get_completed_by_user(user_id):
    completed_order_list = list()
    order_group_list = db_session().query(OrderGroup).filter_by(
        user_id=user_id, completed=True, order_group_status=OrderGroupStatus.COMPLETED
    ).all()
    for order_group in order_group_list:
        item_dict = dict(id=order_group.id, order_list=list())
        order_list = db_session().query(Order).filter_by(
            order_group_id=order_group.id, order_status=OrderStatus.COMPLETED
        ).all()
        for order in order_list:
            order_dict = dict(
                completed_date=order.completed_time.strftime(DATE_FORMAT),
                local_name=order.local.name,
                total=order_service.compute_total_price(order.id),
                ticket=order_service.get_ticket(order.id)
            )
            item_dict['order_list'].append(order_dict)
        completed_order_list.append(item_dict)
    return completed_order_list
