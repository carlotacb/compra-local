from geopy import Nominatim
from geopy.distance import geodesic

from src.config import MAPS_DISTANCES_LIST
from src.helper import log


_geo_locator = Nominatim()


def filter_by_around(coordinates_dict, latitude, longitude):
    # Compute distance
    distance_dict = dict()
    current_coordinates = (latitude, longitude)
    for item_id, local_coordinates in coordinates_dict.items():
        local_coordinates = (local_coordinates.get('latitude'), local_coordinates.get('longitude'))
        distance = geodesic(current_coordinates, local_coordinates).m
        distance_dict[item_id] = distance
        log.info(f'{item_id}: {distance}m')
    distance_dict = sorted(distance_dict.items(), key=lambda item: item[1])
    # Filter by distance
    item_id_list = list()
    for distance in MAPS_DISTANCES_LIST:
        for item_id, item_distance in distance_dict:
            if item_id not in item_id_list and item_distance <= distance:
                item_id_list.append(item_id)
        if item_id_list:
            break
    return item_id_list


def compute_coordinates(postal_address):
    location = _geo_locator.geocode(postal_address)
    return None if not location else (location.latitude, location.longitude)
