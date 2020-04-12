from datetime import datetime

from src.db.sqlalchemy import db_session
from src.enum.order_status import OrderStatus, OrderStatusEdit, OrderGroupStatus
from src.enum.price_type import PriceType
from src.helper import log
from src.model.order import Order
from src.model.order_item import OrderItem
from src.service import local as local_service
from src.service import order_group as order_group_service


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
            ),
            Order(
                local_id=local_service.get_id_by_name('Bona Fruita Busquets'),
                order_group_id=4, order_status=OrderStatus.COMPLETED
            )
        ]
        db_session().bulk_save_objects(object_list)
        db_session().commit()
    else:
        log.info(f'Skipping dummy data for {Order.__tablename__} because is not empty.')


def get(order_id):
    order = db_session().query(Order).filter_by(id=order_id).first()
    return order if order else None


def compute_total_price(order_id):
    total = 0.0
    order_item_list = db_session().query(OrderItem).filter_by(order_id=order_id).all()
    for order_item in order_item_list:
        total += order_item.quantity * order_item.product.price
    return round(total, 2)


def generate_quantity(quantity, price_type):
    quantity = int(quantity) if quantity.is_integer() else quantity
    price_type = ' unitats' if price_type == PriceType.UNIT else price_type.value.lower()
    return f'{quantity}{price_type}'


def get_ticket(order_id):
    ticket_list = list()
    order_item_list = db_session().query(OrderItem).filter_by(order_id=order_id).all()
    for order_item in order_item_list:
        ticket_list.append(dict(
            product_name=order_item.product.name,
            quantity=generate_quantity(order_item.quantity, order_item.product.price_type),
            total_price=round(order_item.quantity * order_item.product.price, 2)
        ))
    return ticket_list


def get_step(order_status):
    if order_status == OrderStatus.COMPLETED:
        return 4
    if order_status == OrderStatus.PREPARING:
        return 1
    if order_status == OrderStatus.PENDING_PICKUP:
        return 2
    if order_status == OrderStatus.PICKED_UP:
        return 3
    if order_status == OrderStatus.CANCELLED:
        return -1
    if order_status == OrderStatus.DELIVERING:
        return 3
    if order_status == OrderStatus.PENDING_STORE:
        return 0
    if order_status == OrderStatus.PENDING_HELPER:
        return 2


def edit_pending_store(order, order_group):
    order_group.completed = False
    order.order_status = OrderStatus.PENDING_STORE
    if order_group.helper_needed:
        order_group.order_group_status = OrderGroupStatus.PENDING_HELPER
    else:
        order_group.order_group_status = OrderGroupStatus.PENDING_PICKUP


def edit_preparing(order, order_group):
    order_group.completed = False
    order.order_status = OrderStatus.PREPARING
    if order_group.helper_needed:
        order_group.order_group_status = OrderGroupStatus.PENDING_HELPER
    else:
        order_group.order_group_status = OrderGroupStatus.PENDING_PICKUP


def edit_ready(order, order_group):
    order_group.completed = False
    if order_group.helper_needed:
        if order_group.helper_id:
            order.order_status = OrderStatus.PENDING_PICKUP
        else:
            order.order_status = OrderStatus.PENDING_HELPER
    elif order.pick_up:
        order.order_status = OrderStatus.PENDING_PICKUP


def edit_on_it(order, order_group):
    order_group.completed = False
    if order_group.helper_needed and order_group.helper_id:
        order.order_status = OrderStatus.PICKED_UP
    elif order.delivery:
        order.order_status = OrderStatus.DELIVERING


def edit_done(order, order_group):
    all_order_status_list = order_group_service.get_all_order_status(order_group.id)
    order.order_status = OrderStatus.COMPLETED
    order.completed_time = datetime.utcnow()
    if sum(bool(o == OrderStatus.COMPLETED) for o in all_order_status_list) >= len(all_order_status_list) - 1:
        order_group.completed = True
        order_group.order_group_status = OrderGroupStatus.COMPLETED


def edit(order_id, new_status):
    order = get(order_id)
    if order:
        order_group = order_group_service.get(order.order_group_id)
        if new_status == OrderStatusEdit.PENDING_STORE:
            edit_pending_store(order, order_group)
        elif new_status == OrderStatusEdit.PREPARING:
            edit_preparing(order, order_group)
        elif new_status == OrderStatusEdit.READY:
            edit_ready(order, order_group)
        elif new_status == OrderStatusEdit.ON_IT:
            edit_on_it(order, order_group)
        elif new_status == OrderStatusEdit.DONE:
            edit_done(order, order_group)
        db_session().commit()
        return True
    else:
        return False
