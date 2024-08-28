#!/bin/bash
RELYING_PARTY_URL=$(aws ssm get-parameter --name "/check-hmrc-cri-api/smoke-tests/core-stub-url" --query "Parameter.Value" --output text)
WEBSITE_HOST=$(aws cloudformation describe-stacks --stack-name check-hmrc-cri-front --query "Stacks[0].Outputs[?OutputKey=='WebsiteHost'].OutputValue" --output text)
ENVIRONMENT=$(aws cloudformation describe-stacks --stack-name check-hmrc-cri-front --query "Stacks[0].Outputs[?OutputKey=='Environment'].OutputValue" --output text)

export RELYING_PARTY_URL
export WEBSITE_HOST
export ENVIRONMENT
export GITHUB_ACTIONS=true

npm run test:browser -- --tags @post-merge
