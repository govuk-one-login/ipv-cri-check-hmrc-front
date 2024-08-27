#!/bin/bash

export USE_LOCAL_API="false"
export WEBSITE_HOST="https://review-hc.dev.account.gov.uk/"
export ENV="dev"
export RELYING_PARTY_URL=$(aws ssm get-parameter --name "/check-hmrc-cri-api/smoke-tests/core-stub-url" --query "Parameter.Value" --output text)

npm run test:browser -- --tags @post-merge
