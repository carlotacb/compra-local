from flask import request

from src.config import MESSAGE_PARAMETERS_REQUIRED, MESSAGE_USER_WRONG_ID, MESSAGE_USER_NOT_FOUND, \
    MESSAGE_USER_TYPE_NOT_COMPATIBLE, MESSAGE_USER_POST_ERROR
from src.enum.user_type import UserType
from src.helper import response
from src.service import user as user_service


def get(user_id):
    try:
        # Check input
        if not user_id or user_id <= 0:
            return response.make(error=True, message=MESSAGE_USER_WRONG_ID)
        # Get instance
        user = user_service.get(user_id)
        if not user:
            return response.make(error=True, message=MESSAGE_USER_NOT_FOUND)
        # Return instance object
        return response.make(error=False, response=dict(user=user.serialize()))
    except Exception as e:
        return response.raise_exception(e)


def put(user_id):
    try:
        # Check input
        if not user_id or user_id <= 0:
            return response.make(error=True, message=MESSAGE_USER_WRONG_ID)
        # Check user
        user = user_service.get(user_id)
        if not user:
            return response.make(error=True, message=MESSAGE_USER_NOT_FOUND)
        # Get input
        request_json = request.json
        name = request_json.get('name', None)
        email_address = request_json.get('email_address', None)
        image = request_json.get('image', None)
        # Process
        edited = user_service.edit(user_id, name=name, email_address=email_address, image=image)
        return response.make(error=False, response=dict(edited=edited))
    except Exception as e:
        return response.raise_exception(e)


def post():
    try:
        # Check input
        body = request.json
        required_parameters = ['name', 'email_address', 'password', 'type']
        if not all(x in body for x in required_parameters):
            return response.make(error=True, message=MESSAGE_PARAMETERS_REQUIRED)

        if body.get('type') not in (UserType.client.value, UserType.business.value):
            return response.make(error=True, message=MESSAGE_USER_TYPE_NOT_COMPATIBLE)
        user_type = UserType.client if body.get('type') == UserType.client.value else UserType.business

        # Create instance
        user_id, error_message = user_service.create(
            name=body.get('name'),
            email_address=body.get('email_address'),
            password=body.get('password'),
            user_type=user_type,
            image=body.get('image', None)
        )
        if user_id:
            return response.make(error=False, response=dict(user_id=user_id))
        else:
            return response.make(error=True, message=f'{MESSAGE_USER_POST_ERROR} - {error_message}')
    except Exception as e:
        return response.raise_exception(e)
