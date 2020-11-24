FROM node:current-slim

WORKDIR /usr/src/app

EXPOSE 8080

COPY package.json .

RUN npm install

COPY src src/

RUN npm run build

CMD ["npm", "start"]