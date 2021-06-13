FROM mhart/alpine-node:14

WORKDIR /usr/app

EXPOSE 3001

COPY package.json ./
COPY yarn.lock ./

RUN yarn install --frozen-lockfile --quiet
COPY . ./
RUN yarn build

CMD ["node", "dist/main.js"]