from fastapi import APIRouter, Depends, HTTPException, Form, UploadFile, File
from sqlalchemy.ext.asyncio import AsyncSession
import os
from sqlalchemy import update, select
from app.models.database import get_session
from app.models.models import User, Role
from app.scheme.auth import CreateUser
from app.settings import img_folder
from app.utilit.auth import hashing_password, verify_password, get_user_by_username, \
    generate_jwt_token, get_current_user
auth = APIRouter(prefix='/api/auth', tags=['User'])


@auth.post('/register', status_code=201)
async def register(user: CreateUser, db: AsyncSession = Depends(get_session)):
    try:
        password = await hashing_password(user.password)
        new_user = User(username=user.username, email=user.email, password=password)
        db.add(new_user)
        await db.commit()
        return {'message': 'Success'}
    except:
        raise HTTPException(status_code=409, detail='user is exist')


@auth.post('/login', status_code=200)
async def login(username: str = Form(...), password: str = Form(...)) -> dict:
    user = await get_user_by_username(username)
    if user:
        if await verify_password(password, user.password):
            token = await generate_jwt_token({'sub': user.username})
            return {'token': token, 'type': 'bearer'}
    raise HTTPException(status_code=400, detail='invalid username or password')


@auth.get('/profile', status_code=200)
async def profile(user: User = Depends(get_current_user), db: AsyncSession = Depends(get_session)):
    if user.role is not None:
        role = await db.execute(select(Role).where(Role.id == user.role))
        return {**user.__dict__, 'role': role.scalar_one_or_none().name}
    return user


@auth.put('/profile/edit_img', status_code=200)
async def edit(img: UploadFile, user: User = Depends(get_current_user),
               db: AsyncSession = Depends(get_session)):
    try:
        await db.execute(update(User).values(img_profile=img.filename).where(User.id == user.id))
        await db.commit()
        os.makedirs(img_folder, exist_ok=True)
        img_path = os.path.join(img_folder, img.filename)
        with open(img_path, 'wb') as file:
            content = await img.read()
            file.write(content)
        return {'message': 'Success'}
    except:
        raise HTTPException(status_code=409, detail='img has not been updated')

