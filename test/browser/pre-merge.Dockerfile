FROM mcr.microsoft.com/playwright:v1.55.1-jammy

WORKDIR /app

COPY package.json package-lock.json .npmrc ./

RUN mkdir -p tests/browser

COPY tests/browser/package.json ./tests/browser

RUN npm ci --workspace tests/browser

WORKDIR /app/tests/browser

COPY tests/browser ./

CMD [ "./run-tests-pre-merge.sh" ]
