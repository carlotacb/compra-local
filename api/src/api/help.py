from flask import request

from src.config import MESSAGE_PARAMETERS_REQUIRED, MESSAGE_USER_NOT_FOUND, MESSAGE_ORDER_GROUP_NOT_FOUND, \
    MESSAGE_ORDER_GROUP_SAME_USER, MESSAGE_USER_WRONG_ID
from src.helper import response, maps
from src.service import local as local_service
from src.service import order_group as order_group_service
from src.service import user as user_service


def get(latitude, longitude):
    try:
        # Get all local coordinates
        coordinates_dict = local_service.get_all_coordinates()
        local_id_list = maps.filter_by_around(coordinates_dict, latitude, longitude)
        helper_list = order_group_service.get_helper_needed_by_local(local_id_list)
        return response.make(error=False, response=dict(helper_list=helper_list))
    except Exception as e:
        return response.raise_exception(e)


def assign():
    # Check input
    body = request.json
    required_parameters = ['user_id', 'order_group_id']
    if not all(x in body for x in required_parameters):
        return response.make(error=True, message=MESSAGE_PARAMETERS_REQUIRED)
    if not body.get('user_id') or body.get('user_id') <= 0:
        return response.make(error=True, message=MESSAGE_USER_WRONG_ID)
    # Check user
    user = user_service.get(body.get('user_id'))
    if not user:
        return response.make(error=True, message=MESSAGE_USER_NOT_FOUND)
    # Check order group
    order_group = order_group_service.get(body.get('order_group_id'))
    if not order_group:
        return response.make(error=True, message=MESSAGE_ORDER_GROUP_NOT_FOUND)
    # Check user to not be the one from order group
    if order_group.user_id == user.id:
        return response.make(error=True, message=MESSAGE_ORDER_GROUP_SAME_USER)
    # Process
    assigned = order_group_service.assign(user.id, order_group)
    return response.make(error=False, response=dict(assigned=assigned))
