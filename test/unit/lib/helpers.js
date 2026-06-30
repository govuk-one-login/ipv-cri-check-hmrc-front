import { vi } from "vitest";
import JourneyModel from "hmpo-form-wizard/lib/journey-model.js";
import WizardModel from "hmpo-form-wizard/lib/wizard-model.js";

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
    status: vi.fn().mockReturnThis(),
    statusCode: vi.fn().mockReturnThis(),
    message: vi.fn().mockReturnThis(),
    json: vi.fn().mockReturnThis(),
    send: vi.fn().mockReturnThis(),
    redirect: vi.fn().mockReturnThis(),
    render: vi.fn().mockReturnThis(),
    locals: {},
    ...overrides,
  };
};
export const createDefaultReqResNext = () => {
  const req = mockRequest({
    form: {
      options: {
        fields: {},
      },
      values: {},
    },
    customFetch: vi
      .fn()
      .mockImplementation(async () => new Response(null, { status: 204 })),
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
  const next = vi.fn();
  return {
    req,
    res,
    next,
  };
};
