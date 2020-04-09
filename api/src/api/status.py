from src.db.sqlalchemy import meta
from src.helper import response, log


def get():
    log.info(f'List of DB tables: {list(meta.tables.keys())}')
    return response.make(False, response=dict(ok=True)), 200
