from src.config import MESSAGE_USER_WRONG_ID, MESSAGE_USER_NOT_FOUND
from src.helper import response
from src.service import user as user_service


def get(user_id):
    # Check input
    if not user_id or user_id <= 0:
        return response.make(error=True, message=MESSAGE_USER_WRONG_ID)
    # Get instance
    user = user_service.get(user_id)
    if not user:
        return response.make(error=True, message=MESSAGE_USER_NOT_FOUND)
    # Return instance object
    return response.make(error=False, response=dict(user=user.serialize()))
