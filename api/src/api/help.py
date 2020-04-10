from src.helper import response, maps
from src.service import local as local_service
from src.service import order_group as order_group_service


def get(latitude, longitude):
    try:
        # Get all local coordinates
        coordinates_dict = local_service.get_all_coordinates()
        local_id_list = maps.filter_by_around(coordinates_dict, latitude, longitude)
        helper_list = order_group_service.get_helper_needed_by_local(local_id_list)
        return response.make(error=False, response=dict(helper_list=helper_list))
    except Exception as e:
        return response.raise_exception(e)
