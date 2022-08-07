### imageのビルド
```
docker build -t イメージ名 . 
```
### コンテナの起動
```
docker run -it イメージ名 /bin/sh
```
### fastAPIサーバの起動
```
uvicorn api.main:app --reload
```
