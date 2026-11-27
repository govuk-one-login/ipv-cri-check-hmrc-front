# 22-alpine amd64 (node version 22.23.4)
ARG NODE_SHA=sha256:0e1754758c2df4cfa3e68d59e2e1b7374bb7fd9ea6328eaaacf15cc934af8202
FROM node@${NODE_SHA} AS builder

ENV PORT=5000

WORKDIR /app

COPY package.json package-lock.json .npmrc ./
RUN npm ci

COPY . ./
RUN npm run build

HEALTHCHECK --interval=10s --timeout=2s --start-period=5s --retries=3 \
  CMD curl -f "http://localhost:$PORT/healthcheck" || exit 1

# node
USER 1000

CMD [ "npm", "run", "dev" ]

EXPOSE $PORT
