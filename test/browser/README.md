# di-ipv-cri-check-hmrc-front-tests

Check HMRC Credential Issuer Frontend Tests is a test suite designed to run against the webserver in the root of this repository.

## Quick Start

The following quickstart process details how to install and run the browser tests against an existing frontend website..

### Major Dependencies

- [Node.js](https://nodejs.org/en/) (>= 20.11.1)
- [NPM](https://www.npmjs.com/) (>= 9.6.0)

### Installation

1. Install node dependencies:

   ```
   npm ci
   ```

### Configuring the application

Create a copy of the example environment variable file and add values for the keys:

```
cp .env.example .env
```

Set the [environment variables](./environment-variables.md) accordingly.

### Running the tests

```
npm run test:browser
```

### Cucumber

The browser tests are written as [Cucumber Gherkin Features](https://cucumber.io/docs/gherkin/) with the [cucumber-js](https://cucumber.io/docs/installation/javascript/) test runner integrated with [Playwright](https://playwright.dev/)

### Test Data

When invoking error scenarios, use a valid NINO beginning with `EE` and with the exception of `EE123456A` which is the retry scenario.

### Running visual regression tests

To run the visual regression via Docker, run the command `docker compose up visual` within the test/docker directory. This will spin up the screenshots with the `-linux` suffix which runs in the workflow.

To run the visual regression tests locally and to see the tests running in a browser, run the following command `npm run test:visual`.
Ensure the following commands are ran too `imposter up` and `npm run build && dev`. This will produce locally generated screenshots with the `-darwin` suffix which is ignored from git.

N.B: If the screenshots aren't already on your local machine the tests will fail initially, when ran again the baseline screenshots will be added to your local machine and will execute the `toMatchSnapshot()` method.
