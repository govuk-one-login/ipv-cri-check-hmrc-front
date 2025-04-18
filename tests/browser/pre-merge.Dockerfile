FROM mcr.microsoft.com/playwright:v1.52.0-jammy

WORKDIR /tests

COPY package.json package-lock.json ./

RUN npm install

COPY . ./

CMD ["./run-tests-pre-merge.sh"]
