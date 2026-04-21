import { mock, beforeEach } from "node:test";
const JourneyModel = require("hmpo-form-wizard/lib/journey-model");
const WizardModel = require("hmpo-form-wizard/lib/wizard-model.js");

const mockRequest = (overrides = {}) => ({
  body: {},
  params: {},
  query: {},
  headers: {},
  form: {},
  session: {},
  ...overrides,
});

const mockResponse = (overrides = {}) => {
  return {
    status: mock.fn(() => res),
    statusCode: mock.fn(() => res),
    message: mock.fn(() => res),
    json: mock.fn(() => res),
    send: mock.fn(() => res),
    redirect: mock.fn(() => res),
    render: mock.fn(() => res),
    locals: {},
    ...overrides,
  };
};

/* global createDefaultReqResNext */
export const createDefaultReqResNext = () => {
  const req = mockRequest({
    form: {
      options: {
        fields: {},
      },
      values: {},
    },
    axios: {
      get: this.mock.fn(),
      post: this.mock.fn(),
      put: this.mock.fn(),
    },
    session: {
      "hmpo-wizard-previous": {},
    },
    headers: {
      "txma-audit-encoded": "dummy-txma-header",
    },
  });

  req.journeyModel = new JourneyModel(null, {
    req,
    key: "test",
  });

  req.sessionModel = new WizardModel(null, {
    req,
    key: "test",
    journeyModel: req.journeyModel,
    fields: {},
  });

  const res = mockResponse({});
  const next = t.mock.fn();
  return {
    req,
    res,
    next,
  };
};

beforeEach(() => {
  const setup = createDefaultReqResNext();

  global.req = setup.req;
  global.res = setup.res;
  global.next = setup.next;
});
