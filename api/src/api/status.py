from src.helper import response


def get():
    return response.make(False, response=dict(ok=True)), 200
