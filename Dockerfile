FROM node:23.0.0-alpine3.19@sha256:144224874a3f67c2b2809f2c7e0f0ea50a9a1235d1b13923ec229b7be6a8d565 AS builder
WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

COPY /src ./src
RUN npm run build

RUN npm prune

FROM node:23.0.0-alpine3.19@sha256:144224874a3f67c2b2809f2c7e0f0ea50a9a1235d1b13923ec229b7be6a8d565 AS final

RUN ["apk", "--no-cache", "upgrade"]
RUN ["apk", "add", "--no-cache", "tini"]

WORKDIR /app

# Copy in compile assets and deps from build container
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/package.json ./
COPY --from=builder /app/package-lock.json ./
COPY --from=builder /app/src ./src

# Add in dynatrace layer
COPY --from=khw46367.live.dynatrace.com/linux/oneagent-codemodules-musl:nodejs / /
ENV LD_PRELOAD /opt/dynatrace/oneagent/agent/lib64/liboneagentproc.so

ENV PORT 8080
EXPOSE $PORT

ENTRYPOINT ["tini", "--"]

CMD ["npm", "start"]
