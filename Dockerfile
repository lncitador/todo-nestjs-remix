FROM node:16-alpine AS builder

RUN apk update
RUN apk add --no-cache openssl

WORKDIR /app

COPY package.json yarn.lock ./

RUN yarn install

COPY . .

RUN yarn build

FROM node:16-alpine AS runner

WORKDIR /app

COPY --from=builder /app/package.json /app/yarn.lock ./

RUN yarn install --production

COPY --from=builder /app/build ./build
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/public/build ./public/build
COPY --from=builder /app/node_modules/.prisma/client ./node_modules/.prisma/client
COPY --from=builder /app/node_modules/@prisma ./node_modules/@prisma

EXPOSE 3000

CMD ["yarn", "start:prod"]

