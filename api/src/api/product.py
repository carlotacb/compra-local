from src.config import MESSAGE_LOCAL_WRONG_ID, MESSAGE_LOCAL_NOT_FOUND, MESSAGE_USER_WRONG_ID, MESSAGE_USER_NOT_FOUND
from src.helper import response
from src.service import local as local_service
from src.service import product as product_service


def local_all(local_id):
    try:
        # Check input
        if not local_id or local_id <= 0:
            return response.make(error=True, message=MESSAGE_LOCAL_WRONG_ID)
        # Get instance
        local = local_service.get(local_id)
        if not local:
            return response.make(error=True, message=MESSAGE_LOCAL_NOT_FOUND)
        # Get all reviews
        product_list = product_service.get_all(local_id)
        # Return list
        return response.make(error=False, response=dict(reviews_list=product_list))
    except Exception as e:
        return response.raise_exception(e)