from flask import request

from src.config import MESSAGE_LOCAL_NOT_FOUND, MESSAGE_PARAMETERS_REQUIRED, MESSAGE_LOCAL_WRONG_ID
from src.helper import response
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
        locals = local_service.get_all()
        print(locals)
        local_list = []
        for local in locals:
            local_list.append(local.serialize())
        print(local_list)
        return response.make(error=False, response=dict(locals=local_list))
    except Exception as e:
        return response.raise_exception(e)


def post():
    try:
        # Check input
        body = request.json
        required_parameters = ['name', 'postal_address', 'latitude', 'longitude']
        if not all(x in body for x in required_parameters):
            return response.make(error=True, message=MESSAGE_PARAMETERS_REQUIRED)
        
        local_id, error_message = local_service.create(
            name=body.get('name'),
            postal_address=body.get('postal_address'),
            latitude=body.get('latitude'),
            longitude=body.get('longitude'),
            website=body.get('webstie', None),
            description=body.get('description', None),
            category=body.get('category', None),
            phone_number=body.get('phone_number', None),
            image=body.get('image', None),
            pick_up=body.get('pick_up', True),
            delivery=body.get('delivery', False),
        )
        if local_id:
            return response.make(error=False, response=dict(local_id=local_id))
        else:
            return response.make(error=True, message=f'{MESSAGE_PARAMETERS_REQUIRED} - {error_message}')
    except Exception as e:
        return response.raise_exception(e)


def put(local_id):
    try:
        # Check input
        if not local_id or local_id <= 0:
            return response.make(error=True, message=MESSAGE_LOCAL_WRONG_ID)
        # Check user
        user = user_service.get(user_id)
        if not user:
            return response.make(error=True, message=MESSAGE_LOCAL_NOT_FOUND)
        # Get input
        request_json = request.json
        name = request_json.get('name', None)
        postal_address = request_json.get('postal_address', None)
        latitude = request_json.get('latitude', None)
        longitude = request_json.get('longitude', None)
        website = request_json.get('webstie', None)
        description = request_json.get('description', None)
        category = request_json.get('category', None)
        phone_number = request_json.get('phone_number', None)
        image = request_json.get('image', None)
        pick_up = request_json.get('pick_up', None)
        delivery = request_json.get('delivery', None)
        # Process
        edited = local_service.edit(local_id, name=name, description=description, postal_address=postal_address,
                                    latitude=latitude, longitude=longitude, website=website, phone_number=phone_number,
                                    pick_up=pick_up, delivery=delivery, category=category, image=image)
        return response.make(error=False, response=dict(edited=edited))
    except Exception as e:
        return response.raise_exception(e)