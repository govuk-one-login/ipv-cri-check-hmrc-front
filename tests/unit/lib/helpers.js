import { mock, beforeEach } from "bun:test";

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
    status: mock(() => res),
    statusCode: mock(() => res),
    message: mock(() => res),
    json: mock(() => res),
    send: mock(() => res),
    redirect: mock(() => res),
    render: mock(() => res),
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
      get: mock(),
      post: mock(),
      put: mock(),
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
  const next = mock();
  return {
    req,
    res,
    next,
  };
};

// beforeEach(() => {
//   const setup = createDefaultReqResNext();
//
//   global.req = setup.req;
//   global.res = setup.res;
//   global.next = setup.next;
// });
