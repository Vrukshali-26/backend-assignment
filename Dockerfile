FROM node:21-alpine3.17

WORKDIR /app

ENV PATH /app/node_modules/.bin:$PATH

COPY package.json ./

RUN npm install

COPY .  ./

RUN npx prisma migrate dev --name init

EXPOSE 3000

CMD ["node", "./src/index.js"]