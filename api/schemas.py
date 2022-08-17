from typing import List,Union
from pydantic import BaseModel

#https://note.com/engneer_hino/n/n4abca76027b8

class ItemBase(BaseModel):
    title:str
    description:Union[str,None]=None

class ItemCreate(ItemBase):
    pass

class Item(ItemBase):
    id:int
    owner_id:int

    class Config:
        orm_mode=True

class UserBase(BaseModel):
    email:str

class UserCreate(UserBase):
    username:str
    password:str

class User(UserBase):
    id:int
    username:str
    is_active:bool
    items:List[Item]=[]

    class Config:
        orm_mode=True


