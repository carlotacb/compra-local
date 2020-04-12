from src.helper import response
from src.service import category as category_service


def get_all():
    try:
        category_list = [category.serialize() for category in category_service.get_all()]
        return response.make(error=False, response=dict(category_list=category_list))
    except Exception as e:
        return response.raise_exception(e)
