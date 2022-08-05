FROM node:lts-alpine

RUN apk update && apk add --virtual=module curl git python3 python3-dev py3-pip

RUN npm install -g create-react-app
RUN npm install axios
RUN pip3 install uvicorn fastapi requests

WORKDIR /usr/src/app
EXPOSE 8000 3000