FROM node:18-alpine

WORKDIR /app

COPY . .

# Set env before installing
ENV NODE_ENV=production

# Use `npm ci` for clean install of only prod dependencies
RUN npm ci --omit=dev

RUN npm install

RUN npx prisma generate

EXPOSE 3000

RUN npm run build
CMD ["npm", "run", "start"]