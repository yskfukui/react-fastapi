from sqlalchemy.orm import Session
import jwt
from . import models,schemas,database
from fastapi import FastAPI,Depends,HTTPException,security
from passlib import hash

oauth2schema = security.OAuth2PasswordBearer(tokenUrl="/api/token")
JWT_SECRET="c281d9885563337df6bc059260cee55de2861050ad73c0b13d422023f79ea560"

def get_db():
    db = database.SessionLocal()
    try:
        yield db
    finally:
        db.close()

def get_user(db:Session,user_id:int):
    return db.query(models.User).filter(models.User.id==user_id).first()

def get_user_by_email(db:Session,email:str):
    return db.query(models.User).filter(models.User.email==email).first()

def get_users(db:Session,skip:int=0,limit:int=100):
    return db.query(models.User).offset(skip).limit(limit).all()

def create_user(db:Session,user:schemas.UserCreate):
    db_user=models.User(email=user.email,password=hash.bcrypt.hash(user.password),username=user.username)
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user


def get_item(item_id:int,user:schemas.User,db:Session):
    item=(db.query(models.Item)
    .filter_by(owner_id=user.id)
    .filter(models.Item.id==item_id)
    .first()
    )
    return schemas.Item.from_orm(item)


def get_items(user:schemas.User,db:Session):
    items= db.query(models.Item).filter_by(owner_id=user.id)
    return list(map(schemas.Item.from_orm,items))

def create_user_item(db:Session,item:schemas.ItemCreate,user_id:int):
    db_item=models.Item(**item.dict(),owner_id=user_id)
    db.add(db_item)
    db.commit()
    db.refresh(db_item)
    return db_item

def get_items_free(db: Session, skip: int = 0, limit: int = 100):
    return db.query(models.Item).offset(skip).limit(limit).all()

def create_Item(user:schemas.User,db:Session,item:schemas.ItemCreate):
    item=models.Item(**item.dict(),owner_id=user.id)
    db.add(item)
    db.commit()
    db.refresh(item)
    return schemas.Item.from_orm(item)

def delete_item(item_id:int,user:schemas.User,db:Session):
    item=(db.query(models.Item)
    .filter_by(owner_id=user.id)
    .filter(models.Item.id==item_id)
    .first()
    )
    if item is None:
        raise HTTPException(status_code=404,detail="Item does not exist")

    db.delete(item)
    db.commit()

def update_item(item_id:int,item:schemas.ItemCreate,user:schemas.User,db:Session):
    item_db=(db.query(models.Item)
    .filter_by(owner_id=user.id)
    .filter(models.Item.id==item_id)
    .first()
    )
    item_db.title=item.title
    item_db.description=item.description

    db.commit()
    db.refresh(item_db)

    return schemas.Item.from_orm(item_db)

# -----------JWT認証------------------
# https://github.com/sixfwa/react-fastapi/blob/main/backend/services.py
def authenticate_user(email:str,password:str,db:Session):
    user=get_user_by_email(db=db,email=email)

    if not user:
        return False
    
    if not user.verify_password(password):
        return False
    
    return user

def create_token(user:models.User):
    user_obj=schemas.User.from_orm(user)
    token=jwt.encode(user_obj.dict(),JWT_SECRET)
    return dict(access_token=token,token_type="bearer")

def get_current_user(db:Session=Depends(get_db),token:str=Depends(oauth2schema)):
    try:
        payload=jwt.decode(token,JWT_SECRET,algorithms=["HS256"])
        user=db.query(models.User).get(payload["id"])
    except:
        raise HTTPException(
            status_code=401,detail="Invalid Email or Password"
        )
    return schemas.User.from_orm(user)

#----------------------------------------------------------------
