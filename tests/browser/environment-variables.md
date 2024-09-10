# Environment variables

## General

- Environment variables can be set for local development using a `.env` file. An example file is included as a starting point.
- `GITHUB_ACTIONS` is set by default when running as a GitHub Action

| Name              | Description                                                                                                                                   | Default               |
| :---------------- | :-------------------------------------------------------------------------------------------------------------------------------------------- | :-------------------- |
| USE_LOCAL_API     | Enable the use of passthrough @mock-api tags into the `client-id`                                                                             | true                  |
| WEBSITE_HOST      | URL of the website to test against                                                                                                            | http://localhost:5090 |
| RELYING_PARTY_URL | URL of the relying party, should be `https://user:{password}@cri.core.stubs.account.gov.uk` when using core stub                              | http://example.net    |
| ENVIRONMENT       | The environment tests are being run against (note only needed for post merge, WEBSITE_HOST should also be updated to reflect the environment) | dev                   |
