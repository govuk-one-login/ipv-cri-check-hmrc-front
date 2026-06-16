import dotenv from "dotenv";

dotenv.config();

export const PACKAGE_NAME = "di-ipv-cri-check-hmrc-front";

export const API = {
  BASE_URL: process.env.API_BASE_URL || "http://localhost:8080",
  PATHS: {
    SESSION: "/session",
    AUTHORIZATION: "/authorization",
    CHECK: "/check",
    ABANDON: "/abandon",
  },
};

export const APP = {
  BASE_URL: process.env.EXTERNAL_WEBSITE_HOST || "http://localhost:5000",
  PATHS: {
    CHECK: "/",
  },
  GTM: {
    GA4_CONTAINER_ID: process.env.GA4_CONTAINER_ID,
  },
  FRONTEND_DOMAIN: process.env.FRONTEND_DOMAIN || "localhost",
  DEVICE_INTELLIGENCE_DOMAIN:
    process.env.DEVICE_INTELLIGENCE_DOMAIN || "account.gov.uk",
};

export const LOG_LEVEL = process.env.LOG_LEVEL || "info";

export const AWS_REGION = process.env.AWS_REGION || "eu-west-2";

export const PORT = process.env.PORT || 5000;

export const SESSION_SECRET = process.env.SESSION_SECRET;

export const SESSION_TABLE_NAME = process.env.SESSION_TABLE_NAME;

export const SESSION_TTL = process.env.SESSION_TTL || 7200000; // two hours in ms

export const OVERLOAD_PROTECTION = {
  production: process.env.NODE_ENV === "production",
  clientRetrySecs: 1,
  sampleInterval: 5,
  maxEventLoopDelay: 400,
  maxHeapUsedBytes: 0,
  maxRssBytes: 0,
  errorPropagationMode: false,
  logging: "error",
};
