FROM node:20-alpine

WORKDIR /usr/src/apps/blog

COPY . .

WORKDIR /usr/src/apps/blog/frontend
RUN npm i
RUN npm run build

WORKDIR /usr/src/apps/blog/backend
RUN npm i

EXPOSE 3001

CMD [ "node", "app.js" ]