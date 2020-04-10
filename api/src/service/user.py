from src.db.sqlalchemy import db_session
from src.model.user import User


def get(user_id):
    user = db_session().query(User).filter_by(id=user_id).first()
    return user if user else None
