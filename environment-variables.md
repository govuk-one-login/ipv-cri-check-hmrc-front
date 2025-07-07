# Environment variables

## General

- Environment variables can be set for local development using a `.env` file. An example file is included as a starting point.

| Name                  | Description                                                         | Default               |
| :-------------------- | :------------------------------------------------------------------ | :-------------------- |
| API_BASE_URL          | Base URL for the backend API server                                 | http://localhost:5055 |
| ASSETS_BASE_URL       | Host for assets CDN                                                 | /public               |
| EXTERNAL_WEBSITE_HOST | The (accessible) hostname (and port) of the listening web server.   | http://locahost:5050  |
| PORT                  | Port the web server listens on                                      | 5000                  |
| SESSION_SECRET        | A complex string unique to the environment, used to encrypt cookies |                       |
| SESSION_TABLE_NAME    | Table name for the user session data                                |                       |
| SESSION_TTL           | How long the user session should last (in milliseconds)             | 7200000 (2 hours)     |

## Metrics and Analytics

| Name                        | Description                                                                               | Default        |
| :-------------------------- | :---------------------------------------------------------------------------------------- | :------------- |
| FRONTEND_DOMAIN             | Cookie domain to persist values throughout the different sections of the OneLogin journey | localhost      |
| DEVICE_INTELLIGENCE_ENABLED | Feature flag to enable device intelligence                                                | false          |
| DEVICE_INTELLIGENCE_DOMAIN  | Domain to apply to the device intelligence cookie if device intelligence is enabled       | account.gov.uk |
| LANGUAGE_TOGGLE_DISABLED    | Feature flag to enable the Welsh language toggle                                          | true           |
| GA4_CONTAINER_ID            | Container ID for GA4, required for analytics to work correctly                            | GTM-KD86CMZ    |
| GA4_ENABLED                 | Feature flag to enable GA4                                                                | true           |
| UA_CONTAINER_ID             | Container ID for Universal Analytics, required for UA to work correctly                   | GTM-TK92W68    |
| UA_ENABLED                  | Feature flag to enable UA                                                                 | false          |
| ANALYTICS_DATA_SENSITIVE    | Feature flag for analyticsDataSensitive                                                   | false          |
| LOG_LEVEL                   | Determines the log level for the application                                              | request        |
| MAY_2025_REBRAND_ENABLED    | Feature flag to enable the May 2025 GOV.UK branding changes                               | false          |
