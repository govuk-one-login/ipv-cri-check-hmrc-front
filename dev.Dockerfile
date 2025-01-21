ARG DYNATRACE_SOURCE=khw46367.live.dynatrace.com/linux/oneagent-codemodules-musl:nodejs
ARG NODE_SHA=sha256:56e8282f4392fb96c877babc93b3829e46b79c6fbcd48c92de578febffc80587

FROM ${DYNATRACE_SOURCE} AS dynatrace
FROM arm64v8/node@${NODE_SHA} AS builder

WORKDIR /app

COPY package.json package-lock.json ./
COPY /src ./src

RUN npm ci && npm run build && npm prune

FROM arm64v8/node@${NODE_SHA} AS final

RUN <<COMMANDS
  apt-get update -y
  apt-get install -y --no-install-recommends curl tini
  apt-get clean
COMMANDS

WORKDIR /app

# Copy in compile assets and deps from build container
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/package.json ./
COPY --from=builder /app/package-lock.json ./
COPY --from=builder /app/src ./src

# Add in dynatrace layer
COPY --from=dynatrace / /
ENV LD_PRELOAD=/opt/dynatrace/oneagent/agent/lib64/liboneagentproc.so

ENV PORT=8080
EXPOSE $PORT

HEALTHCHECK --interval=10s --timeout=2s --start-period=5s --retries=3 \
  CMD curl -f http://localhost:$PORT/healthcheck || exit 1

ENTRYPOINT ["tini", "--"]
CMD ["npm", "start"]
