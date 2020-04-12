from flask import request

from src.config import MESSAGE_LOCAL_WRONG_ID, MESSAGE_LOCAL_NOT_FOUND, MESSAGE_USER_WRONG_ID, MESSAGE_USER_NOT_FOUND, \
    MESSAGE_PARAMETERS_REQUIRED, MESSAGE_ORDER_NOT_FOUND, MESSAGE_REVIEW_WRONG_PUNCTUATION, \
    MESSAGE_REVIEW_LOCAL_POST_ERROR, MESSAGE_ORDER_GROUP_NOT_FOUND, MESSAGE_REVIEW_USER_POST_ERROR
from src.helper import response
from src.service import local as local_service
from src.service import order as order_service
from src.service import order_group as order_group_service
from src.service import review_local as review_local_service
from src.service import review_user as review_user_service
from src.service import user as user_service


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


def user_average(user_id):
    try:
        # Check input
        if not user_id or user_id <= 0:
            return response.make(error=True, message=MESSAGE_USER_WRONG_ID)
        # Get instance
        user = user_service.get(user_id)
        if not user:
            return response.make(error=True, message=MESSAGE_USER_NOT_FOUND)
        # Compute average
        average = review_user_service.get_average(user_id)
        # Return average
        return response.make(error=False, response=dict(average=average))
    except Exception as e:
        return response.raise_exception(e)


def user_all(user_id):
    try:
        # Check input
        if not user_id or user_id <= 0:
            return response.make(error=True, message=MESSAGE_USER_WRONG_ID)
        # Get instance
        user = user_service.get(user_id)
        if not user:
            return response.make(error=True, message=MESSAGE_USER_NOT_FOUND)
        # Get all reviews
        reviews_list = review_user_service.get_all(user_id)
        # Return list
        return response.make(error=False, response=dict(reviews_list=reviews_list))
    except Exception as e:
        return response.raise_exception(e)


def pending(user_id):
    try:
        # Check input
        if not user_id or user_id <= 0:
            return response.make(error=True, message=MESSAGE_USER_WRONG_ID)
        # Get instance
        user = user_service.get(user_id)
        if not user:
            return response.make(error=True, message=MESSAGE_USER_NOT_FOUND)
        # Get pending reviews
        pending_reviews = user_service.get_pending_reviews(user_id)
        # Return list
        return response.make(error=False, response=dict(pending_reviews=pending_reviews))
    except Exception as e:
        return response.raise_exception(e)


def done(user_id):
    try:
        # Check input
        if not user_id or user_id <= 0:
            return response.make(error=True, message=MESSAGE_USER_WRONG_ID)
        # Get instance
        user = user_service.get(user_id)
        if not user:
            return response.make(error=True, message=MESSAGE_USER_NOT_FOUND)
        # Get done reviews
        done_reviews = user_service.get_done_reviews(user_id)
        # Return list
        return response.make(error=False, response=dict(done_reviews=done_reviews))
    except Exception as e:
        return response.raise_exception(e)


def post_local():
    try:
        # Check input
        body = request.json
        required_parameters = ['writer_id', 'order_id', 'punctuation']
        if not all(x in body for x in required_parameters):
            return response.make(error=True, message=MESSAGE_PARAMETERS_REQUIRED)
        if not body.get('writer_id') or body.get('writer_id') <= 0:
            return response.make(error=True, message=MESSAGE_USER_WRONG_ID)

        # Check writer
        writer = user_service.get(body.get('writer_id'))
        if not writer:
            return response.make(error=True, message=MESSAGE_USER_NOT_FOUND)

        # Check order
        order = order_service.get(body.get('order_id'))
        if not order:
            return response.make(error=True, message=MESSAGE_ORDER_NOT_FOUND)

        # Check punctuation
        if body.get('punctuation') > 5 or body.get('punctuation') < 0:
            return response.make(error=True, message=MESSAGE_REVIEW_WRONG_PUNCTUATION)

        # Create review
        review_local_id, error_message = review_local_service.create(
            writer_id=body.get('writer_id'),
            order_id=body.get('order_id'),
            punctuation=body.get('punctuation'),
            comment=body.get('comment', str())
        )
        if review_local_id:
            return response.make(error=False, response=dict(review_local_id=review_local_id))
        else:
            return response.make(error=True, message=f'{MESSAGE_REVIEW_LOCAL_POST_ERROR} - {error_message}')
    except Exception as e:
        return response.raise_exception(e)


def post_user():
    try:
        # Check input
        body = request.json
        required_parameters = ['writer_id', 'order_group_id', 'punctuation']
        if not all(x in body for x in required_parameters):
            return response.make(error=True, message=MESSAGE_PARAMETERS_REQUIRED)
        if not body.get('writer_id') or body.get('writer_id') <= 0:
            return response.make(error=True, message=MESSAGE_USER_WRONG_ID)

        # Check writer
        writer = user_service.get(body.get('writer_id'))
        if not writer:
            return response.make(error=True, message=MESSAGE_USER_NOT_FOUND)

        # Check order
        order_group = order_group_service.get(body.get('order_group_id'))
        if not order_group:
            return response.make(error=True, message=MESSAGE_ORDER_GROUP_NOT_FOUND)

        # Check punctuation
        if body.get('punctuation') > 5 or body.get('punctuation') < 0:
            return response.make(error=True, message=MESSAGE_REVIEW_WRONG_PUNCTUATION)

        # Create review
        review_user_id, error_message = review_user_service.create(
            writer_id=body.get('writer_id'),
            order_group_id=body.get('order_group_id'),
            punctuation=body.get('punctuation'),
            comment=body.get('comment', str())
        )
        if review_user_id:
            return response.make(error=False, response=dict(review_user_id=review_user_id))
        else:
            return response.make(error=True, message=f'{MESSAGE_REVIEW_USER_POST_ERROR} - {error_message}')
    except Exception as e:
        return response.raise_exception(e)
