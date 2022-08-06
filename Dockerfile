FROM node:lts-alpine
WORKDIR /root/app
COPY . ./
RUN apk update && apk add --virtual=module curl git python3 python3-dev py3-pip

RUN pip3 install uvicorn fastapi requests


EXPOSE 8000 3000