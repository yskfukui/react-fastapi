from msilib import schema
from fastapi import FastAPI,Depends,HTTPException,security
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from . import crud,models,schemas
from .crud import get_db
from .database import SessionLocal,engine
from typing import List

app=FastAPI()
origins=[
    "http://localhost:3000",
]
models.Base.metadata.create_all(bind=engine)
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)




@app.post("/users/")
def create_user(user: schemas.UserCreate, db: Session = Depends(get_db)):
    db_user = crud.get_user_by_email(db, email=user.email)
    if db_user:
        raise HTTPException(status_code=400, detail="Email already registered")
    user=crud.create_user(db=db, user=user)
    return crud.create_token(user)


@app.get("/users/", response_model=List[schemas.User])
def read_users(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    users = crud.get_users(db, skip=skip, limit=limit)
    return users


@app.get("/users/{user_id}", response_model=schemas.User)
def read_user(user_id: int, db: Session = Depends(get_db)):
    db_user = crud.get_user(db, user_id=user_id)
    if db_user is None:
        raise HTTPException(status_code=404, detail="User not found")
    return db_user


@app.post("/users/{user_id}/items/", response_model=schemas.Item)
def create_item_for_user(
    user_id: int, item: schemas.ItemCreate, db: Session = Depends(get_db)
):
    return crud.create_user_item(db=db, item=item, user_id=user_id)


@app.get("/items/", response_model=List[schemas.Item])
def read_items(
    user:schemas.User=Depends(crud.get_current_user),
    db:Session=Depends(get_db)
):
    return crud.get_items(user=user,db=db)



# https://github.com/sixfwa/react-fastapi/blob/main/backend/main.py
@app.post("/api/token")
def generate_token(
    form_data:security.OAuth2PasswordRequestForm=Depends(),
    db:Session=Depends(get_db),
):
    user=crud.authenticate_user(form_data.username,form_data.password,db)
    if not user:
        raise HTTPException(status_code=401,detail="Invalid Credentials")

    return crud.create_token(user)

@app.get("/api/users/me",response_model=schemas.User)
def get_user(user:schemas.User=Depends(crud.get_current_user)):
    return user
