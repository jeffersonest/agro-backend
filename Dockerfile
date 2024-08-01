FROM node:22-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

COPY .env .env

RUN npm run build

EXPOSE 4000

CMD ["sh", "-c", "npm run typeorm:migration:run && node dist/main.js"]
