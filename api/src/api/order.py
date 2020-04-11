from src.config import MESSAGE_USER_WRONG_ID, MESSAGE_USER_NOT_FOUND
from src.helper import response
from src.service import order_group as order_group_service
from src.service import user as user_service


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
