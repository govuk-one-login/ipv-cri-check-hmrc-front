#!/bin/bash
RELYING_PARTY_URL=$(aws cloudformation describe-stacks --stack-name check-hmrc-cri-front --query "Stacks[0].Outputs[?OutputKey=='CoreStubURL'].OutputValue" --output text)
WEBSITE_HOST=$(aws cloudformation describe-stacks --stack-name check-hmrc-cri-front --query "Stacks[0].Outputs[?OutputKey=='WebsiteHost'].OutputValue" --output text)
ENVIRONMENT=$(aws cloudformation describe-stacks --stack-name check-hmrc-cri-front --query "Stacks[0].Outputs[?OutputKey=='Environment'].OutputValue" --output text)

export RELYING_PARTY_URL
export WEBSITE_HOST
export ENVIRONMENT
export GITHUB_ACTIONS=true

cd /tests || exit 1

npm run test:browser -- --tags @post-merge
