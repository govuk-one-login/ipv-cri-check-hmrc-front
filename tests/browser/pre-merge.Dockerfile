FROM mcr.microsoft.com/playwright:v1.34.3-jammy

WORKDIR /tests

COPY package.json package-lock.json ./

RUN npm install

COPY . ./

CMD ["./run-tests-pre-merge.sh"]
