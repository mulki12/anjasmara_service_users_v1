
FROM node:14

RUN mkdir /users
WORKDIR /users

ADD package.json /users/package.json
RUN npm install

COPY . /users

EXPOSE 3000

CMD npm start