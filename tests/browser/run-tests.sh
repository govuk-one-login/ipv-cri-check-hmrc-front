#!/bin/bash

export USE_LOCAL_API="false"
export WEBSITE_HOST="https://review-hc.dev.account.gov.uk/"
export ENV="dev"

npm run test:browser -- --tags @post-merge
