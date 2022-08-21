from msilib import schema
from fastapi import FastAPI,Depends,HTTPException,security,File,UploadFile
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse
from sqlalchemy.orm import Session
from . import crud,models,schemas
from .crud import get_db
from .database import SessionLocal,engine
from typing import List
import shutil

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


#--------------------GET-----------------------
#登録されているユーザーを取得
@app.get("/users/", response_model=List[schemas.User])
def read_users(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    users = crud.get_users(db, skip=skip, limit=limit)
    return users

# 登録されているユーザーをidを指定して取得
@app.get("/users/{user_id}", response_model=schemas.User)
def read_user(user_id: int, db: Session = Depends(get_db)):
    db_user = crud.get_user(db, user_id=user_id)
    if db_user is None:
        raise HTTPException(status_code=404, detail="User not found")
    return db_user

# ユーザーに紐づけられたItemを取得
@app.get("/items/", response_model=List[schemas.Item])
def read_items(
    user:schemas.User=Depends(crud.get_current_user),
    db:Session=Depends(get_db)
):
    return crud.get_items(user=user,db=db)

# ユーザーに紐付けられたItemの中でItem_idを指定してItemを取得
@app.get("/items/{item_id}", status_code=200)
def get_item(
    item_id:int,
    user: schemas.User = Depends(crud.get_current_user),
    db: Session = Depends(crud.get_db),
):
    return crud.get_item(item_id,user,db)


#　認証無しで全てのitemを見たい場合(テスト用)
@app.get("/items/free/", response_model=List[schemas.Item])
def read_items(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    items = crud.get_items_free(db, skip=skip, limit=limit)
    return items

# トークンからユーザーを検索
@app.get("/api/users/me",response_model=schemas.User)
def get_user(user:schemas.User=Depends(crud.get_current_user)):
    return user

#　パスから画像を取得
@app.get("/images/{file_name}")
def get_image(file_name:str):
    path = f'api/files/{file_name}'
    return FileResponse(path)
#--------------------POST----------------

# 新たにユーザーを登録
@app.post("/users/")
def create_user(user: schemas.UserCreate, db: Session = Depends(get_db)):
    db_user = crud.get_user_by_email(db, email=user.email)
    if db_user:
        raise HTTPException(status_code=400, detail="Email already registered")
    user=crud.create_user(db=db, user=user)
    return crud.create_token(user)

# ユーザーに紐づいてItemを登録
@app.post("/users/{user_id}/items/", response_model=schemas.Item)
def create_item_for_user(
    user_id: int, item: schemas.ItemCreate, db: Session = Depends(get_db)
):
    return crud.create_user_item(db=db, item=item, user_id=user_id)

# ユーザーに紐づいてItemを登録 ver2
@app.post("/items/", response_model=schemas.Item)
def create_lead(
    item: schemas.ItemCreate,
    user: schemas.User = Depends(crud.get_current_user),
    db: Session = Depends(crud.get_db),
):
    return crud.create_Item(user=user, db=db, item=item)

# JWT認証:メールアドレスとパスワードをもらってトークンを生成
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

@app.post("/images/")
def get_uploadfile(upload_file: UploadFile):
    path = f'api/files/{upload_file.filename}'
    print(upload_file.file)
    with open(path, 'wb+') as buffer:
        print(upload_file.file)
        shutil.copyfileobj(upload_file.file, buffer)
    return {
        'filename': path,
        'type': upload_file.content_type
    }
# --------------DELETE---------
# ユーザーに紐づいたItemのうち、item_idを指定して削除

@app.delete("/items/{item_id}", status_code=204)
def delete_item(
    item_id:int,
    user: schemas.User = Depends(crud.get_current_user),
    db: Session = Depends(crud.get_db),
):
    crud.delete_item(item_id,user,db)
    return {"message","Successfully Deleted"}


#--------------------PUT----------------
#ユーザーに紐づいたItemのうち、item_idを指定して更新

@app.put("/items/{item_id}",status_code=200)
def update_item(
    item_id:int,
    item:schemas.ItemCreate,
    user:schemas.User=Depends(crud.get_current_user),
    db:Session=Depends(crud.get_db)
):
    crud.update_item(item_id,item,user,db)
    return {"message","Successfully Updated"}



@app.get("/")
def announce():
    return "please access to localhost:8000/docs for api-document "
