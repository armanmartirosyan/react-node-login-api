FROM node:22-bookworm

WORKDIR /app

COPY . .

RUN npm install
RUN npm run migrate:latest 
RUN npm run build

RUN rm -rf ./src tsconfig.json

RUN npm prune --production

EXPOSE 5000

CMD ["node", "./dist/index.js"]
