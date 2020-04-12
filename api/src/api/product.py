from flask import request

from src.config import MESSAGE_LOCAL_WRONG_ID, MESSAGE_LOCAL_NOT_FOUND, MESSAGE_PRODUCT_WRONG_ID, \
    MESSAGE_PRODUCT_GROUP_NOT_FOUND, MESSAGE_PARAMETERS_REQUIRED, MESSAGE_PRODUCT_NOT_FOUND
from src.helper import response
from src.service import local as local_service
from src.service import product as product_service


def get(local_id, product_id):
    try:
        # Check input
        if not local_id or local_id <= 0:
            return response.make(error=True, message=MESSAGE_LOCAL_WRONG_ID)
        if not product_id or product_id <= 0:
            return response.make(error=True, message=MESSAGE_PRODUCT_WRONG_ID)
        # Get instance
        local = local_service.get(local_id)
        if not local:
            return response.make(error=True, message=MESSAGE_LOCAL_NOT_FOUND)
        # Get all reviews
        product = product_service.get_product(local_id, product_id)
        if not product:
            return response.make(error=True, message=MESSAGE_PRODUCT_NOT_FOUND)
        return response.make(error=False, response=dict(product=product.serialize()))
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
        product_list = product_service.get_all(local_id)
        # Return list
        return response.make(error=False, response=dict(product_list=product_list))
    except Exception as e:
        return response.raise_exception(e)


def post(local_id):
    try:
        # Check input
        body = request.json
        required_parameters = ['name', 'price', 'currency', 'price_type']
        if not all(x in body for x in required_parameters):
            return response.make(error=True, message=MESSAGE_PARAMETERS_REQUIRED)

        if not local_id or local_id <= 0:
            return response.make(error=True, message=MESSAGE_LOCAL_WRONG_ID)

        local = local_service.get(local_id)
        if not local:
            return response.make(error=True, message=MESSAGE_LOCAL_NOT_FOUND)

        # Check prodcut_group
        if body.get('product_group', None):
            product_group = body.get('product_group')
            if not product_group:
                return response.make(error=True, message=MESSAGE_PRODUCT_GROUP_NOT_FOUND)

        product_id, error_message = product_service.create(
            name=body.get('name'),
            price=body.get('price'),
            currency=body.get('currency'),
            price_type=body.get('price_type'),
            local_id=local_id,
            description=body.get('description', None),
            product_group=body.get('product_group', None)
        )
        if local_id:
            return response.make(error=False, response=dict(product_id=product_id))
        else:
            return response.make(error=True, message=f'{MESSAGE_PARAMETERS_REQUIRED} - {error_message}')
    except Exception as e:
        return response.raise_exception(e)


def put(local_id, product_id):
    try:
        body = request.json
        # Check input
        if not local_id or local_id <= 0:
            return response.make(error=True, message=MESSAGE_LOCAL_WRONG_ID)
        if not product_id or product_id <= 0:
            return response.make(error=True, message=MESSAGE_PRODUCT_WRONG_ID)
        # Check local
        product = product_service.get_product(local_id, product_id)
        if not product:
            return response.make(error=True, message=MESSAGE_LOCAL_NOT_FOUND)
        # Get input
        name = body.get('name', None)
        price = body.get('price', None)
        currency = body.get('currency', None)
        price_type = body.get('price_type', None)
        description = body.get('description', None)
        product_group = body.get('product_group', None)
        # Process
        edited = product_service.edit(
            local_id, product_id, name, price, currency, price_type, description, product_group
        )
        return response.make(error=False, response=dict(edited=edited))
    except Exception as e:
        return response.raise_exception(e)


def delete(local_id, product_id):
    try:
        # Check input
        if not local_id or local_id <= 0:
            return response.make(error=True, message=MESSAGE_LOCAL_WRONG_ID)
        if not product_id or product_id <= 0:
            return response.make(error=True, message=MESSAGE_PRODUCT_WRONG_ID)
        # Check product
        product = product_service.get_product(local_id, product_id)
        if not product:
            return response.make(error=True, message=MESSAGE_LOCAL_NOT_FOUND)
        # Process
        deleted = product_service.delete(local_id, product_id)
        return response.make(error=False, response=dict(deleted=deleted))
    except Exception as e:
        return response.raise_exception(e)
