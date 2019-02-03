FROM node:10.15.0

WORKDIR /to-picture-bed

COPY . .

ENV SASS_BINARY_SITE http://npm.taobao.org/mirrors/node-sass
RUN npm config set registry https://registry.npm.taobao.org/ \
    && npm install \
    && npm run build

CMD node server