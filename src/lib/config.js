require("dotenv").config();

module.exports = {
  API: {
    BASE_URL: process.env.API_BASE_URL || "http://localhost:8080",
    PATHS: {
      SESSION: "/session",
      AUTHORIZATION: "/authorization",
      CHECK: "/check",
      ABANDON: "/abandon",
    },
  },
  APP: {
    BASE_URL: process.env.EXTERNAL_WEBSITE_HOST || "http://localhost:5000",
    PATHS: {
      CHECK: "/",
    },
    GTM: {
      UA_ENABLED: process.env.UA_ENABLED || "false",
      UA_CONTAINER_ID: process.env.UA_CONTAINER_ID,
      GA4_ENABLED: process.env.GA4_ENABLED || "false",
      GA4_CONTAINER_ID: process.env.GA4_CONTAINER_ID,
      ANALYTICS_DATA_SENSITIVE: process.env.ANALYTICS_DATA_SENSITIVE,
    },
    FRONTEND_DOMAIN: process.env.FRONTEND_DOMAIN || "localhost",
    LANGUAGE_TOGGLE_DISABLED: process.env.LANGUAGE_TOGGLE_DISABLED || "true",
    DEVICE_INTELLIGENCE_ENABLED:
      process.env.DEVICE_INTELLIGENCE_ENABLED || "false",
  },
  LOG_LEVEL: process.env.LOG_LEVEL || "request",
  AWS_REGION: process.env.AWS_REGION || "eu-west-2",
  PORT: process.env.PORT || 5000,
  SESSION_SECRET: process.env.SESSION_SECRET,
  SESSION_TABLE_NAME: process.env.SESSION_TABLE_NAME,
  SESSION_TTL: process.env.SESSION_TTL || 7200000, // two hours in ms
  OVERLOAD_PROTECTION: {
    production: process.env.NODE_ENV === "production",
    clientRetrySecs: 1,
    sampleInterval: 5,
    maxEventLoopDelay: 400,
    maxHeapUsedBytes: 0,
    maxRssBytes: 0,
    errorPropagationMode: false,
    logging: "error",
  },
};
