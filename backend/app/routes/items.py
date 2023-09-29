from fastapi import APIRouter, Depends, HTTPException, UploadFile, File, Form
import os
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from app.scheme.items import CategoryScheme
from app.models.database import get_session
from app.models.models import Category, Item
from app.settings import img_folder

items = APIRouter(prefix='/api/items', tags=['Items'])


@items.post('/add_category', status_code=201)
async def add_category(category: CategoryScheme, db: AsyncSession = Depends(get_session)) -> dict:
    try:
        new_category = Category(name=category.name)
        db.add(new_category)
        await db.commit()
        return {'message': 'Success'}
    except:
        raise HTTPException(status_code=409)


@items.get('/category', status_code=200)
async def get_category(db: AsyncSession = Depends(get_session)):
    category = await db.execute(select(Category))
    return category.scalars().all()


@items.post('/add', status_code=201)
async def add_item(name: str = Form(),
                   img: UploadFile = File(),
                   description: str = Form(),
                   quantity: int = Form(),
                   cost: int = Form(),
                   category: int = Form(),
                   db: AsyncSession = Depends(get_session)) -> dict:
    try:
        new_item = Item(name=name, img=img.filename, description=description, quantity=quantity, cost=cost,
                        category=category)
        db.add(new_item)
        await db.commit()
        os.makedirs(img_folder, exist_ok=True)
        img_path = os.path.join(img_folder, img.filename)
        with open(img_path, 'wb') as file:
            content = await img.read()
            file.write(content)
        return {'message': 'Success'}
    except:
        raise HTTPException(status_code=409)


@items.get('/', status_code=200)
async def get_items(db: AsyncSession = Depends(get_session)):
    all_items = await db.execute(select(Item))
    return all_items.scalars().all()


@items.get('/{id}', status_code=200)
async def get_item(id: int, db: AsyncSession = Depends(get_session)):
    item = await db.execute(select(Item).where(Item.id == id))
    item = item.scalar_one_or_none()
    if item:
        category = await db.execute(select(Category).where(Category.id == item.category))
        category = category.scalar_one_or_none().name
        return {**item.__dict__, 'category': category}
    raise HTTPException(status_code=404, detail='item not found')


@items.get('/category/{id}', status_code=200)
async def get_item_by_category(id: int, db: AsyncSession = Depends(get_session)):
    sorted_item = await db.execute(select(Item).where(Item.category == id))
    sorted_item = sorted_item.scalars().all()
    return(sorted_item)    