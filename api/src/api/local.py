from flask import request

from src.config import MESSAGE_LOCAL_NOT_FOUND, MESSAGE_PARAMETERS_REQUIRED, MESSAGE_LOCAL_WRONG_ID, \
    MESSAGE_LOCAL_WRONG_POSTAL_ADDRESS
from src.helper import response, maps
from src.service import local as local_service


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
        required_parameters = ['name', 'postal_address']
        if not all(x in body for x in required_parameters):
            return response.make(error=True, message=MESSAGE_PARAMETERS_REQUIRED)

        # Compute coordinates
        coordinates = maps.compute_coordinates(body.get('postal_address'))
        if not coordinates:
            return response.make(error=True, message=MESSAGE_LOCAL_WRONG_POSTAL_ADDRESS)

        local_id, error_message = local_service.create(
            name=body.get('name'),
            postal_address=body.get('postal_address'),
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
            return response.make(error=True, message=f'{MESSAGE_PARAMETERS_REQUIRED} - {error_message}')
    except Exception as e:
        return response.raise_exception(e)
