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
      CHECK: "/check",
    },
    GTM: {
      ANALYTICS_COOKIE_DOMAIN:
        process.env.ANALYTICS_COOKIE_DOMAIN || "localhost",
      UA_DISABLED: process.env.UA_DISABLED || "false",
      UA_CONTAINER_ID: process.env.UA_CONTAINER_ID,
      GA4_DISABLED: process.env.GA4_DISABLED || "true",
      GA4_CONTAINER_ID: process.env.GA4_CONTAINER_ID,
      ANALYTICS_DATA_SENSITIVE: process.env.ANALYTICS_DATA_SENSITIVE,
    },
    LANGUAGE_TOGGLE_DISABLED: process.env.LANGUAGE_TOGGLE_DISABLED || "true",
  },
  AWS_REGION: process.env.AWS_REGION || "eu-west-2",
  PORT: process.env.PORT || 5000,
  SESSION_SECRET: process.env.SESSION_SECRET,
  SESSION_TABLE_NAME: process.env.SESSION_TABLE_NAME,
  SESSION_TTL: process.env.SESSION_TTL || 7200000, // two hours in ms
};
