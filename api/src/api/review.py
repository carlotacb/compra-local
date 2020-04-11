from src.config import MESSAGE_LOCAL_WRONG_ID, MESSAGE_LOCAL_NOT_FOUND
from src.helper import response
from src.service import local as local_service
from src.service import review_local as review_local_service


def local_average(local_id):
    try:
        # Check input
        if not local_id or local_id <= 0:
            return response.make(error=True, message=MESSAGE_LOCAL_WRONG_ID)
        # Get instance
        local = local_service.get(local_id)
        if not local:
            return response.make(error=True, message=MESSAGE_LOCAL_NOT_FOUND)
        # Compute average
        average = review_local_service.get_average(local_id)
        # Return average
        return response.make(error=False, response=dict(average=average))
    except Exception as e:
        return response.raise_exception(e)


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
        reviews_list = review_local_service.get_all(local_id)
        # Return list
        return response.make(error=False, response=dict(reviews_list=reviews_list))
    except Exception as e:
        return response.raise_exception(e)
