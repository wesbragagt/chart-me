FROM mhart/alpine-node:14

EXPOSE 3000

WORKDIR /usr/app

COPY package.json ./
COPY yarn.lock ./

RUN yarn install --frozen-lockfile --quiet
COPY . ./

CMD ["yarn", "start"]