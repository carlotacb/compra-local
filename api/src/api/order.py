from flask import request

from src.config import MESSAGE_USER_WRONG_ID, MESSAGE_USER_NOT_FOUND, MESSAGE_PARAMETERS_REQUIRED, \
    MESSAGE_ORDER_PRODUCT_LIST_WRONG, MESSAGE_LOCAL_NOT_FOUND, MESSAGE_ORDER_PRODUCT_LIST_NOT_FOUND, \
    MESSAGE_ORDER_POST_ERROR, MESSAGE_LOCAL_WRONG_ID, MESSAGE_ORDER_NOT_FOUND
from src.enum.order_status import OrderStatusEdit
from src.enum.order_type import OrderType
from src.helper import response
from src.service import local as local_service
from src.service import order as order_service
from src.service import order_group as order_group_service
from src.service import product as product_service
from src.service import user as user_service


def post():
    try:
        # Check input
        body = request.json
        required_parameters = ['user_id', 'local_id', 'order_type', 'product_list']
        if not all(x in body for x in required_parameters):
            return response.make(error=True, message=MESSAGE_PARAMETERS_REQUIRED)
        if not body.get('user_id') or body.get('user_id') <= 0:
            return response.make(error=True, message=MESSAGE_USER_WRONG_ID)
        if not body.get('product_list') or \
                not isinstance(body.get('product_list'), list) or \
                len(body.get('product_list')) <= 0:
            return response.make(error=True, message=MESSAGE_ORDER_PRODUCT_LIST_WRONG)

        # Check user
        user = user_service.get(body.get('user_id'))
        if not user:
            return response.make(error=True, message=MESSAGE_USER_NOT_FOUND)

        # Check local
        local = local_service.get(body.get('local_id'))
        if not local:
            return response.make(error=True, message=MESSAGE_LOCAL_NOT_FOUND)

        # Check product
        product_list = [bool(product_service.get_product(local.id, p['product_id'])) for p in body.get('product_list')]
        if not all(product_list):
            return response.make(error=True, message=MESSAGE_ORDER_PRODUCT_LIST_NOT_FOUND)

        # Create instance
        order_group_id, order_id, error_message = order_group_service.create(
            user_id=body.get('user_id'),
            local_id=body.get('local_id'),
            order_type=OrderType(body.get('order_type')),
            product_list=body.get('product_list')
        )
        if order_group_id and order_id:
            return response.make(error=False, response=dict(order_group_id=order_group_id, order_id=order_id))
        else:
            return response.make(error=True, message=f'{MESSAGE_ORDER_POST_ERROR} - {error_message}')
    except Exception as e:
        return response.raise_exception(e)


def user_completed(user_id):
    try:
        # Check input
        if not user_id or user_id <= 0:
            return response.make(error=True, message=MESSAGE_USER_WRONG_ID)
        # Get instance
        user = user_service.get(user_id)
        if not user:
            return response.make(error=True, message=MESSAGE_USER_NOT_FOUND)
        # Get list
        completed_order_list = order_group_service.get_completed_by_user(user_id)
        # Return instance object
        return response.make(error=False, response=dict(completed_order_list=completed_order_list))
    except Exception as e:
        return response.raise_exception(e)


def user_pending(user_id):
    try:
        # Check input
        if not user_id or user_id <= 0:
            return response.make(error=True, message=MESSAGE_USER_WRONG_ID)
        # Get instance
        user = user_service.get(user_id)
        if not user:
            return response.make(error=True, message=MESSAGE_USER_NOT_FOUND)
        # Get list
        pending_order_list = order_group_service.get_pending_by_user(user_id)
        # Return instance object
        return response.make(error=False, response=dict(pending_order_list=pending_order_list))
    except Exception as e:
        return response.raise_exception(e)


def user_helping(user_id):
    try:
        # Check input
        if not user_id or user_id <= 0:
            return response.make(error=True, message=MESSAGE_USER_WRONG_ID)
        # Get instance
        user = user_service.get(user_id)
        if not user:
            return response.make(error=True, message=MESSAGE_USER_NOT_FOUND)
        # Get list
        helping_order_list = order_group_service.get_helping_by_user(user_id)
        # Return instance object
        return response.make(error=False, response=dict(helping_order_list=helping_order_list))
    except Exception as e:
        return response.raise_exception(e)


def local_pending(local_id):
    try:
        # Check input
        if not local_id or local_id <= 0:
            return response.make(error=True, message=MESSAGE_LOCAL_WRONG_ID)
        # Get instance
        local = local_service.get(local_id)
        if not local:
            return response.make(error=True, message=MESSAGE_LOCAL_NOT_FOUND)
        # Get list
        pending_order_list = order_group_service.get_pending_by_local(local_id)
        # Return instance object
        return response.make(error=False, response=dict(pending_order_list=pending_order_list))
    except Exception as e:
        return response.raise_exception(e)


def local_progress(local_id):
    try:
        # Check input
        if not local_id or local_id <= 0:
            return response.make(error=True, message=MESSAGE_LOCAL_WRONG_ID)
        # Get instance
        local = local_service.get(local_id)
        if not local:
            return response.make(error=True, message=MESSAGE_LOCAL_NOT_FOUND)
        # Get list
        progress_order_list = order_group_service.get_progress_by_local(local_id)
        # Return instance object
        return response.make(error=False, response=dict(progress_order_list=progress_order_list))
    except Exception as e:
        return response.raise_exception(e)


def local_completed(local_id):
    try:
        # Check input
        if not local_id or local_id <= 0:
            return response.make(error=True, message=MESSAGE_LOCAL_WRONG_ID)
        # Get instance
        local = local_service.get(local_id)
        if not local:
            return response.make(error=True, message=MESSAGE_LOCAL_NOT_FOUND)
        # Get list
        completed_order_list = order_group_service.get_completed_by_local(local_id)
        # Return instance object
        return response.make(error=False, response=dict(completed_order_list=completed_order_list))
    except Exception as e:
        return response.raise_exception(e)


def put(order_id):
    try:
        # Check input
        body = request.json
        required_parameters = ['new_status']
        if not all(x in body for x in required_parameters):
            return response.make(error=True, message=MESSAGE_PARAMETERS_REQUIRED)
        # Get instance
        order = order_service.get(order_id)
        if not order:
            return response.make(error=True, message=MESSAGE_ORDER_NOT_FOUND)
        # Process
        edited = order_service.edit(order_id=order_id, new_status=OrderStatusEdit(body.get('new_status')))
        return response.make(error=False, response=dict(edited=edited))
    except Exception as e:
        return response.raise_exception(e)
