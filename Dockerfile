ARG NODE_IMAGE=node:16.17.0-alpine

FROM $NODE_IMAGE AS base
RUN apk --no-cache add dumb-init ca-certificates
RUN mkdir -p /home/node/app && chown node:node /home/node/app
WORKDIR /home/node/app
USER node:node
RUN mkdir tmp

FROM base AS dependencies
COPY --chown=node:node ./package*.json ./
RUN npm ci
COPY --chown=node:node . .

FROM dependencies AS integration-tests
CMD npm run migration:run;npm run test;npm run test:e2e

FROM dependencies AS build
RUN npm run build

FROM base AS production
ENV NODE_ENV=production
ENV PORT=3333
COPY --chown=node:node ./package*.json ./
RUN npm ci --production
COPY --chown=node:node --from=build /home/node/app/dist .
CMD [ "dumb-init", "node", "main.js" ]
