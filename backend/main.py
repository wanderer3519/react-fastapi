import fastapi as _fastapi
import fastapi.security as _security
import sqlalchemy.orm as _orm
import services as _services
import schemas as _schemas

app = _fastapi.FastAPI()

@app.post('/api/users')
async def create_user(user: _schemas.UserCreate, db: _orm.Session = _fastapi.Depends):
    db_user = _services.get_user_by_email(user.email, db)

    if db_user:
        raise _fastapi.HTTPException(status_code = 400, detail = "Email already in use")
    
    