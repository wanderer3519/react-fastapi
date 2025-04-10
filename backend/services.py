import sqlalchemy.orm as _orm
import database as _database
import models as _models
import schemas as _schemas

import passlib.hash as _hashfn

def create_database():
    return _database.Base.metadata.create_all(bind = _database.engine)


def get_db():
    db = _database.SessionLocal()
    try:
        yield db
    finally:
        db.close()

async def get_user_by_email(email: str, db: _orm.Session):
    return db.query(_models.User).filter(_models.User.email == email).first()

async def create_user(user: _schemas.UserCreate, db: _orm.Session):
    user_obj = _models.User(email = user.email, hashed_password = )