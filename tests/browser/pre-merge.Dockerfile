FROM mcr.microsoft.com/playwright:v1.55.1-jammy

WORKDIR /tests

COPY package.json package-lock.json .npmrc ./

RUN npm ci

COPY . ./

CMD ["./run-tests-pre-merge.sh"]
