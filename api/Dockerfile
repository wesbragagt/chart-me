FROM mhart/alpine-node:14

WORKDIR /usr/app

ENV PORT=8080
EXPOSE $PORT


COPY package.json ./
COPY yarn.lock ./

RUN yarn install --frozen-lockfile -quiet

COPY . ./

CMD ["node", "index.js"]