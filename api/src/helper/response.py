def make(error, message=None, response=None):
    response_dict = dict(error=error)
    if error:
        assert isinstance(message, str)
        response_dict['message'] = message
    else:
        assert isinstance(response, dict)
        response_dict['response'] = response
    return response_dict
