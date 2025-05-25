FROM node:18-alpine

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install

COPY nextjs ./nextjs
COPY prisma ./prisma
COPY data ./data
COPY tsconfig.json eslint.config.mjs .env ./
COPY nextjs/tsconfig.json ./nextjs/tsconfig.json

RUN npx prisma generate

EXPOSE 3000

CMD ["sh", "-c", "cd /app/nextjs && export $(grep -v '^#' /app/.env | xargs) && npm run build && npm run start"]