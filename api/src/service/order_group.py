from sqlalchemy import and_, true, false
from sqlalchemy.exc import IntegrityError

from src.config import DATE_FORMAT
from src.db.sqlalchemy import db_session
from src.enum.order_status import OrderGroupStatus, OrderStatus
from src.enum.order_type import OrderType
from src.helper import log
from src.model.order import Order
from src.model.order_group import OrderGroup
from src.model.order_item import OrderItem
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


def get_pending_by_user(user_id):
    pending_order_list = list()
    order_group_list = db_session().query(OrderGroup).filter(and_(
        OrderGroup.user_id == user_id, OrderGroup.completed == false(),
        OrderGroup.order_group_status != OrderGroupStatus.COMPLETED
    )).all()
    for order_group in order_group_list:
        item_dict = dict(
            id=order_group.id, helper_needed=order_group.helper_needed, assigned_helper=bool(order_group.helper_id),
            helper=None if not order_group.helper_id else dict(
                name=order_group.helper.name, phone_number=order_group.helper.phone_number
            ), order_list=list()
        )
        order_list = db_session().query(Order).filter(and_(
            Order.order_group_id == order_group.id, Order.order_status != OrderStatus.COMPLETED
        )).all()
        for order in order_list:
            order_dict = dict(
                delivery=order.delivery,
                local_name=order.local.name,
                total=order_service.compute_total_price(order.id),
                ticket=order_service.get_ticket(order.id),
                step=order_service.get_step(order.order_status)
            )
            item_dict['order_list'].append(order_dict)
        pending_order_list.append(item_dict)
    return pending_order_list


def get_helping_by_user(user_id):
    helping_order_list = list()
    order_group_list = db_session().query(OrderGroup).filter(and_(
        OrderGroup.helper_id == user_id, OrderGroup.completed == false(),
        OrderGroup.order_group_status != OrderGroupStatus.COMPLETED
    )).all()
    for order_group in order_group_list:
        item_dict = dict(id=order_group.id, user=order_group.user.serialize(), order_list=list())
        order_list = db_session().query(Order).filter(and_(
            Order.order_group_id == order_group.id, Order.order_status != OrderStatus.COMPLETED
        )).all()
        for order in order_list:
            order_dict = dict(
                id=order.id,
                name=order.local.name,
                postal_address=order.local.postal_address,
                total=order_service.compute_total_price(order.id),
                status=order.order_status.value
            )
            item_dict['order_list'].append(order_dict)
        item_dict['total'] = sum(o['total'] for o in item_dict['order_list'])
        helping_order_list.append(item_dict)
    return helping_order_list


def create(user_id, local_id, order_type, product_list):
    try:
        # Order group
        helper_needed = order_type == OrderType.HELPER_NEEDED
        order_group = OrderGroup(
            completed=False,
            helper_needed=helper_needed,
            user_id=user_id,
            helper_id=None,
            order_group_status=OrderGroupStatus.PENDING_HELPER if helper_needed else OrderGroupStatus.PENDING_PICKUP
        )
        db_session().add(order_group)
        db_session().flush()
        # Order
        order = Order(
            pick_up=order_type == OrderType.PICK_UP,
            delivery=order_type == OrderType.DELIVER,
            local_id=local_id,
            order_group_id=order_group.id,
            order_status=OrderStatus.PENDING_STORE
        )
        db_session().add(order)
        db_session().flush()
        # Order item
        for product in product_list:
            order_item = OrderItem(
                quantity=product.get('quantity'),
                product_id=product.get('product_id'),
                order_id=order.id
            )
            db_session().add(order_item)
        db_session().commit()
        return order_group.id, order.id, None
    except IntegrityError as e:
        return None, None, str(e.args[0]).replace('\n', ' ')


def get_order_type(order_group_object, order_object):
    if order_group_object.helper_needed:
        return OrderType.HELPER_NEEDED
    elif order_object.delivery:
        return OrderType.DELIVER
    else:
        return OrderType.PICK_UP


def serialize_local_order_list(order_group_list):
    result_list = list()
    for item in order_group_list:
        result_list.append(dict(
            id=item[1].id,
            client=item[0].user.serialize(),
            status=item[1].order_status.value,
            order_type=get_order_type(item[0], item[1]).value,
            total=order_service.compute_total_price(item[1].id),
            ticket=order_service.get_ticket(item[1].id)
        ))
    return result_list


def get_pending_by_local(local_id):
    order_group_list = db_session().query(OrderGroup, Order).filter(and_(
        OrderGroup.id == Order.order_group_id,
        Order.local_id == local_id, Order.order_status == OrderStatus.PENDING_STORE
    )).all()
    return serialize_local_order_list(order_group_list)


def get_progress_by_local(local_id):
    order_group_list = db_session().query(OrderGroup, Order).filter(and_(
        OrderGroup.id == Order.order_group_id,
        Order.local_id == local_id, Order.order_status.notin_([OrderStatus.PENDING_STORE, OrderStatus.COMPLETED])
    )).all()
    return serialize_local_order_list(order_group_list)


def get_completed_by_local(local_id):
    order_group_list = db_session().query(OrderGroup, Order).filter(and_(
        OrderGroup.id == Order.order_group_id,
        Order.local_id == local_id, Order.order_status == OrderStatus.COMPLETED
    )).all()
    return serialize_local_order_list(order_group_list)
