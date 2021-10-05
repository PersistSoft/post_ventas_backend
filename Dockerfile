FROM node:14 as build-stage

WORKDIR /usr/src/app

COPY tsconfig.json ./
COPY package*.json ./
RUN npm install

COPY src ./
RUN npm run tsc:prod


FROM node:14 as deploy-stage

WORKDIR /usr/src/app

COPY --from=build-stage /usr/src/app/node_modules ./node_modules
COPY --from=build-stage /usr/src/app/build ./build

EXPOSE 3000
CMD [ "node", "build/server.js" ]