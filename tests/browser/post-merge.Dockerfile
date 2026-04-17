FROM mcr.microsoft.com/playwright:v1.55.1-jammy

RUN apt-get update && apt-get install unzip
RUN wget -O "awscliv2.zip" "https://awscli.amazonaws.com/awscli-exe-linux-x86_64.zip" && unzip awscliv2.zip && ./aws/install

WORKDIR /app

COPY package.json package-lock.json .npmrc ./

RUN mkdir -p tests/browser

COPY tests/browser/package.json ./tests/browser

RUN npm ci --workspace tests/browser

WORKDIR /app/tests/browser

COPY tests/browser ./

CMD [ "./run-tests-post-merge.sh" ]
