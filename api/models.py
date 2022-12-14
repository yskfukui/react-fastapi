from .database import Base
from sqlalchemy import Boolean, Integer, String,ForeignKey,Column
from sqlalchemy.orm import relationship
import passlib.hash as hash

class User(Base):
    __tablename__ = 'users'

    id = Column(Integer, primary_key=True, index=True)
    email = Column(String,unique=True,index=True)
    password = Column(String)
    is_active = Column(Boolean, default=True)
    username = Column(String)
    items=relationship("Item",back_populates="owner")

    def verify_password(self,password:str):
        return hash.bcrypt.verify(password,self.password)

class Item(Base):
    __tablename__="items"
    id=Column(Integer,primary_key=True,index=True)
    title=Column(String,index=True)
    description=Column(String,index=True)
    owner_id=Column(Integer,ForeignKey("users.id"))
    
    owner=relationship("User",back_populates="items")

