# Name the node stage "builder"
FROM mhart/alpine-node:14 AS builder
# Set working directory
WORKDIR /usr/app
COPY package.json ./
COPY yarn.lock ./
# install node modules and build assets
RUN yarn install --frozen-lockfile --quiet
COPY . ./
RUN yarn build

# nginx state for serving content
FROM nginx:alpine
EXPOSE 80
# Set working directory to nginx asset directory
WORKDIR /usr/share/nginx/html
# Remove default nginx static assets
RUN rm -rf ./*
# Copy static assets from builder stage
COPY --from=builder /usr/app/build .
# Containers run nginx with global directives and daemon off
ENTRYPOINT ["nginx", "-g", "daemon off;"]
