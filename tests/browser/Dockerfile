FROM mcr.microsoft.com/playwright:v1.34.3-jammy AS playwright

WORKDIR /tests

COPY . ./
RUN npm install

CMD ["./run-tests.sh"]
