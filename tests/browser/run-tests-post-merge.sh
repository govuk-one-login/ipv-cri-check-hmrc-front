#!/usr/bin/env bash

ENVIRONMENT=$(aws cloudformation describe-stacks --stack-name check-hmrc-cri-front --query "Stacks[0].Parameters[?ParameterKey=='Environment'].ParameterValue" --output text)
RELYING_PARTY_URL=$(aws ssm get-parameter --name "/tests/check-hmrc-cri-front/core-stub-url" --query "Parameter.Value" --output text)
WEBSITE_HOST="https://review-hc.${ENVIRONMENT}.account.gov.uk"

export RELYING_PARTY_URL
export WEBSITE_HOST
export ENVIRONMENT
export GITHUB_ACTIONS=true
export USE_LOCAL_API=false

cd /tests || exit 1

npm run test:browser -- --tags @post-merge
