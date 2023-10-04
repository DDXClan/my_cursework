from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy.dialects.postgresql import UUID
import uuid
Base = declarative_base()


class Category(Base):
    __tablename__ = 'Category'
    id = Column(Integer, primary_key=True, autoincrement=True)
    name = Column(String, nullable=False)


class Item(Base):
    __tablename__ = 'Items'
    id = Column(Integer, primary_key=True, autoincrement=True)
    name = Column(String, nullable=False, unique=True)
    img = Column(String)
    description = Column(String)
    quantity = Column(Integer, default=0)
    cost = Column(Integer, nullable=False, default=0)
    category = Column(ForeignKey(Category.id))


class Role(Base):
    __tablename__ = 'Roles'
    id = Column(Integer, primary_key=True, autoincrement=True)
    name = Column(String, nullable=False, unique=True)


class User(Base):
    __tablename__ = 'Users'
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    username = Column(String, nullable=False, unique=True)
    email = Column(String, nullable=False, unique=True)
    password = Column(String, nullable=False)
    role = Column(ForeignKey(Role.id))
    img_profile = Column(String, default='no_image.png')


class ItemsUser(Base):
    __tablename__ = 'ItemsUser'
    id = Column(Integer, primary_key=True, autoincrement=True)
    user = Column(ForeignKey(User.id))
    item = Column(ForeignKey(Item.id))
