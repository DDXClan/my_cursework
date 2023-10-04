from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from app.models.database import get_session
from app.models.models import User, ItemsUser, Item
from app.utilit.auth import get_current_user
from app.scheme.user_item import UserItemScheme
user_item = APIRouter(prefix='/api/basket', tags=['UserItem'])


@user_item.post('/add', status_code=201)
async def add(item: UserItemScheme, user: User = Depends(get_current_user),
              db: AsyncSession = Depends(get_session)) -> dict:
    try:
        new_item = ItemsUser(user=user.id, item=item.item)
        db.add(new_item)
        await db.commit()
        return {'message': 'Success'}
    except:
        raise HTTPException(status_code=409)


@user_item.get('', status_code=200)
async def get_item(user: User = Depends(get_current_user), db: AsyncSession = Depends(get_session)):
    items = await db.execute(
        select(Item)
        .join(ItemsUser)
        .join(User)
        .filter(User.id == user.id)
    )
    return items.scalars().all()


@user_item.delete('/{id}/delete')
async def delete_item(id: int, user: User = Depends(get_current_user),
                      db: AsyncSession = Depends(get_session)) -> dict:
    try:
        item = await db.execute(select(ItemsUser).where(ItemsUser.user == user.id and
                                                        ItemsUser.item == id))
        item = item.scalars().first()
        if item:
            await db.delete(item)
            await db.commit()
        return {'message': 'Success'}
    except:
        print(id)
        raise HTTPException(status_code=409)
