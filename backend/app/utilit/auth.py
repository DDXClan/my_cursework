import bcrypt
from sqlalchemy import select
import jwt
from fastapi import Depends, HTTPException
from datetime import timedelta, datetime
from app.models.database import async_session
from app.models.models import User
from app.settings import  SECRET_KEY, ALGORITHM, oauth2scheme

EXPIRATION_TIME = timedelta(minutes=30)


async def hashing_password(password) -> str:
    salt = bcrypt.gensalt()
    hashed = bcrypt.hashpw(password.encode('utf-8'), salt)
    return hashed.decode('utf-8')


async def verify_password(password, hashed_password) -> bool:
    return bcrypt.checkpw(password.encode('utf-8'), hashed_password.encode('utf-8'))


async def get_user_by_username(username: str) -> User:
    async with async_session() as db:
        user = await db.execute(select(User).where(User.username == username))
        return user.scalar_one_or_none()


async def generate_jwt_token(data: dict) -> str:
    expiration = datetime.utcnow()+EXPIRATION_TIME
    data.update({'exp': expiration})
    token = jwt.encode(data, SECRET_KEY, algorithm=ALGORITHM)
    return token


async def verify_token(token: str) -> dict:
    try:
        decode_data = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        return decode_data
    except jwt.PyJWTError:
        return None


async def get_current_user(token: str = Depends(oauth2scheme)) -> User:
    decode_data = await verify_token(token)
    if not decode_data:
        raise HTTPException(status_code=400, detail='invalid token')
    user = await get_user_by_username(decode_data.get('sub'))
    if not user:
        raise HTTPException(status_code=404, detail='user not found')
    return user
