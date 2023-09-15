FROM node:16-alpine

# Install dependencies
RUN apk add --no-cache nano autoconf automake libpng-dev libtool nasm gcc make g++

WORKDIR /app

# add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH

COPY src/package.json .
COPY src/pnpm-lock.yaml .

#RUN yarn install
RUN corepack enable
RUN corepack prepare pnpm@latest --activate

RUN pnpm install --frozen-lockfile

COPY src .

EXPOSE 3000

CMD [ "pnpm", "dev" ]