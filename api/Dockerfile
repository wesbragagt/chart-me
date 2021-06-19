FROM mhart/alpine-node:14

WORKDIR /usr/app

EXPOSE 8080

COPY package.json ./
COPY yarn.lock ./

RUN yarn install --frozen-lockfile -quiet

COPY . ./

CMD ["node", "index.js"]