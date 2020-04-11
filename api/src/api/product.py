from src.config import MESSAGE_LOCAL_WRONG_ID, MESSAGE_LOCAL_NOT_FOUND, MESSAGE_USER_WRONG_ID, MESSAGE_USER_NOT_FOUND
from src.helper import response
from src.service import local as local_service
from src.service import product as product_service


def get(local_id, product_id):
    try:
        # Check input
        if not local_id or local_id <= 0:
            return response.make(error=True, message=MESSAGE_LOCAL_WRONG_ID)
        # Get instance
        local = local_service.get(local_id)
        if not local:
            return response.make(error=True, message=MESSAGE_LOCAL_NOT_FOUND)
        # Get all reviews
        product = product_service.get_prodcut(local_id, product_id)
        # Return list
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
        return response.make(error=False, response=dict(reviews_list=product_list))
    except Exception as e:
        return response.raise_exception(e)


def post(local_id):
    try:
        # Check input
        body = request.json
        required_parameters = ['name', 'price', 'currency', 'price_type']
        if not all(x in body for x in required_parameters):
            return response.make(error=True, message=MESSAGE_PARAMETERS_REQUIRED)

        local = local_service.get(local_id)
        if not local:
            return response.make(error=True, message=MESSAGE_LOCAL_NOT_FOUND)

        # Check prodcut_group
        if body.get('product_group', None):
            product_group = product_group.get(body.get('product_group'))
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