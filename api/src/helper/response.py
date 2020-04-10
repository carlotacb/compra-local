from src.config import MESSAGE_UNEXPECTED_ERROR
from src.helper import log


def make(error, message=None, response=None):
    response_dict = dict(error=error)
    if error:
        assert isinstance(message, str)
        response_dict['message'] = message
    else:
        assert isinstance(response, dict)
        response_dict['response'] = response
    return response_dict


def raise_exception(e):
    log.error(f'Unexpected error: [{e}]')
    log.exception(e)
    return make(error=True, message=MESSAGE_UNEXPECTED_ERROR)
