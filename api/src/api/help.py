from src.helper import response, maps
from src.service import local as local_service


def get(latitude, longitude):
    try:
        # Get all local coordinates
        coordinates_dict = local_service.get_all_coordinates()
        local_id_list = maps.filter_by_around(coordinates_dict, latitude, longitude)
        return response.make(error=False, response=dict(helper_list=[]))
    except Exception as e:
        return response.raise_exception(e)
