# ipv-cri-check-hmrc-front

test

[![GitHub Action: Scan repository](https://github.com/govuk-one-login/ipv-cri-check-hmrc-front/actions/workflows/scan-repo.yml/badge.svg?branch=main)](https://github.com/govuk-one-login/ipv-cri-check-hmrc-front/actions/workflows/scan-repo.yml?query=branch%3Amain)
[![Coverage](https://sonarcloud.io/api/project_badges/measure?project=ipv-cri-check-hmrc-front&metric=coverage)](https://sonarcloud.io/summary/overall?id=ipv-cri-check-hmrc-front)

> Note: This repository is templated as part of [di-ipv-cri-templates](https://github.com/alphagov/di-ipv-cri-templates), and any substational changes that can be shared should be included back into that repository for re-use elsewhere

Check HMRC Credential Issuer Frontend is a Credential Issuer as part of the GOV.UK One Login programme.

There are two main repositories that comprise this credential issuer:

- This is the website used for displaying the Check Hmrc Credential Issuer.
- There is a related [api repository](https://github.com/alphagov/di-ipv-cri-check-hmrc-api) that contains the backend API that provides all the data interaction consumed

For frontend specific work there are the following repositories:

- There is a [shared library repository](https://github.com/alphagov/di-ipv-cri-common-express)
- This contains Express middleware, shared JavaScript and Sass files, and shared templates

## Quick Start

The following quickstart process details how to install and run the CRI frontend webserver with API mocks.

### Major Dependencies

- [Node.js](https://nodejs.org/en/) (>= 20.11.1)
- [NPM](https://www.npmjs.com/) (>= 9.6.0)
- [pre-commit](https://pre-commit.com/) (>= 2.17.0)

### Installation

1. Clone repository and change directory:

```
git clone https://github.com/alphagov/di-ipv-cri-check-hmrc-front && cd di-ipv-cri-check-hmrc-front
```

2. Install node dependencies:

```
npm install
```

3. Build the assets

```
npm run build
```

### Configuring the application

Create a copy of the example environment variable file and add values for the keys:

```
cp .env.example .env
```

Set the [environment variables](./environment-variables.md) accordingly.

### Running the application

In order to successfully run the application, the following things are required:

1. frontend application started and configured to point at an API
2. deployed API or mock API needs to be made available and configured
3. a correctly formed entry point url using `client_id` and `request` OAuth parameters

#### Frontend

The app will run on port 5000 by default and be available at [http://localhost:5000](http://localhost:5000).

##### In development mode

To run the server with continuous build mode:

```
npm run dev
```

> Note: By default, the server runs with an in-memory Redis instance, so restarting the server will clear the session.

By default, the application will be running at [http://localhost:5000](http://localhost:5000).

##### In production mode

```
NODE_ENV=production npm start
```

### API

An API is required for all oauth requests and all other backend interactions.

This is configured in the frontend application using the `API_BASE_URL` environment variable, as described in [environment variables](./environment-variables.md).

### Mock API

A standalone mock of the [api](https://github.com/alphagov/di-ipv-cri-check-hmrc-api) is provided using a combination of the API's OpenAPI config and hand-crafted Imposter scenarios.

More details on how to run this are in the [Imposter folder](./tests/imposter/).

When connecting to a mock API both the `client_id` and `request` parameters are determined by the data in the Imposter configuration files. The `client_id` is used for determining what data to return to the frontend, and the request parameter is ignored.

### Deployed API

This can also be connected to a deployed API behind an API Gatewa, using the same `API_BASE_URL` variable.

When connecting to a deployed API both the `client_id` and `request` parameters are supplied by an upstream service acting as this systems Relying Party. The `client_id` is configured for use with API and the `request` payload is signed and encrypted with keys known to the API.

### URL

Using the appropriate `client_id` and `request` parameters, the website can be accessed using a URL similar to:

http://localhost:5000/oauth2/authorize?request=ignored&client_id=success

### Running tests

#### Unit tests

Unit tests can be run from the root of the project using:

```
npm run dev
```

They use Jest as the test runner, which is configured using [jest.config.js](./jest.config.js)

#### Browser tests

Browser tests are run from the [tests/browser](./tests/browser/) folder, with appropriate quick start documentation located there.subfolder of this project, with more details available there.

Post merge tests can be run locally using the command `npm run test:browser -- --tags @post-merge` from the [tests/browser](./tests/browser/) folder.

### Running the application in Docker

Docker allows performance testing to be performed locally against the Node system, we can containerise the frontend application and configure it to point to a
deployed API or mock API enabling us to test the application locally with similar performance limits to production for memory and CPU.

#### Create the Docker image

```
docker build -t check-front:latest .
```

#### Run the Docker image setting memory and CPU limits

Once the image is created, we can use this to spin up a container of the front end using variables to set the
amount of memory and CPUs

```
docker run --memory 1024m --cpus 2 --publish 9050:8080 --env API_BASE_URL=http://localhost:8080 ipv-cri-check-hmrc-front-frontend
```

#### Deployed API or Mock

For the front end to work correctly, you will need to use a mock API so for this Imposter has been used. Imposter can be ran locally using:

```
imposter up
```

#### Dynatrace

With the inclusion of dynatrace in the repository, local testing errors due to authentication. A possible solution to this is to use
a local.Dockerfile without the dynatrace layer.

## Environment Variables

- `LANGUAGE_TOGGLE_DISABLED` - Feature flag to disable Language Toggle, defaulted to `true`

## Licence

The codebase is released under the [MIT License](./LICENSE).
