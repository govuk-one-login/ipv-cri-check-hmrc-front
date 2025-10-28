FROM mcr.microsoft.com/playwright:v1.55.1-jammy

RUN apt-get update && apt-get install unzip
RUN wget -O "awscliv2.zip" "https://awscli.amazonaws.com/awscli-exe-linux-x86_64.zip" && unzip awscliv2.zip && ./aws/install

WORKDIR /tests

COPY package.json package-lock.json ./

RUN npm install

COPY . ./

COPY ./run-tests-post-merge.sh /run-tests.sh

CMD ["/run-tests.sh"]
