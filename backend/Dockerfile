#dev stage
FROM node:18-bookworm-slim as development

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

CMD ["npm", "run", "dev"]

#prod stage
FROM node:18-bookworm-slim as prod

WORKDIR /app

COPY package*.json ./

RUN npm install --only=prod

COPY --from=development /app/dist ./dist

CMD ["node", "dist/index.js"]
