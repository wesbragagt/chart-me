FROM mhart/alpine-node:14 as base

WORKDIR /usr/app

EXPOSE 8080

COPY package.json ./
COPY yarn.lock ./

RUN yarn install --frozen-lockfile -quiet

COPY . ./

FROM base as development
CMD ["yarn", "dev"]

FROM base as production
CMD ["node", "index.js"]