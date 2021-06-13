FROM mhart/alpine-node:14 as base

WORKDIR /usr/app

EXPOSE 3001

COPY package.json ./
COPY yarn.lock ./

RUN yarn install --frozen-lockfile --quiet
COPY . ./

FROM base as development
CMD [ "yarn", "start:dev" ]

FROM base as production
RUN yarn build

CMD ["node", "dist/main.js"]