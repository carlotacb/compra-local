from flask import request

from src.config import MESSAGE_LOCAL_NOT_FOUND, MESSAGE_PARAMETERS_REQUIRED, MESSAGE_LOCAL_WRONG_ID, \
    MESSAGE_LOCAL_WRONG_POSTAL_ADDRESS, MESSAGE_USER_WRONG_ID, MESSAGE_USER_NOT_FOUND, MESSAGE_CATEGORY_NOT_FOUND, \
    MESSAGE_LOCAL_POST_ERROR
from src.helper import response, maps
from src.service import category as category_service
from src.service import local as local_service
from src.service import user as user_service


def get(local_id):
    try:
        # Check input
        if not local_id or local_id <= 0:
            return response.make(error=True, message=MESSAGE_LOCAL_WRONG_ID)
        # Get instance
        local = local_service.get(local_id)
        if not local:
            return response.make(error=True, message=MESSAGE_LOCAL_NOT_FOUND)
        # Return instance object
        return response.make(error=False, response=dict(local=local.serialize()))
    except Exception as e:
        return response.raise_exception(e)


def get_all():
    try:
        local_list = [local.serialize() for local in local_service.get_all()]
        return response.make(error=False, response=dict(local_list=local_list))
    except Exception as e:
        return response.raise_exception(e)


def post():
    try:
        # Check input
        body = request.json
        required_parameters = ['name', 'postal_address', 'user_id']
        if not all(x in body for x in required_parameters):
            return response.make(error=True, message=MESSAGE_PARAMETERS_REQUIRED)
        if not body.get('user_id') or body.get('user_id') <= 0:
            return response.make(error=True, message=MESSAGE_USER_WRONG_ID)

        # Check user
        user = user_service.get(body.get('user_id'))
        if not user:
            return response.make(error=True, message=MESSAGE_USER_NOT_FOUND)

        # Check category
        if body.get('category_id', None):
            category = category_service.get(body.get('category_id'))
            if not category:
                return response.make(error=True, message=MESSAGE_CATEGORY_NOT_FOUND)

        # Compute coordinates
        coordinates = maps.compute_coordinates(body.get('postal_address'))
        if not coordinates:
            return response.make(error=True, message=MESSAGE_LOCAL_WRONG_POSTAL_ADDRESS)

        local_id, error_message = local_service.create(
            name=body.get('name'),
            postal_address=body.get('postal_address'),
            user_id=body.get('user_id'),
            latitude=coordinates[0],
            longitude=coordinates[1],
            website=body.get('website', None),
            description=body.get('description', None),
            category_id=body.get('category_id', None),
            phone_number=body.get('phone_number', None),
            image=body.get('image', None),
            pick_up=body.get('pick_up', True),
            delivery=body.get('delivery', False)
        )
        if local_id:
            return response.make(error=False, response=dict(local_id=local_id))
        else:
            return response.make(error=True, message=f'{MESSAGE_LOCAL_POST_ERROR} - {error_message}')
    except Exception as e:
        return response.raise_exception(e)
