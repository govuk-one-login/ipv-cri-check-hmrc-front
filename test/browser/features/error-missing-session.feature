Feature: Error handling

  API Errors at the start of the journey

  Scenario: Session data missing from request error
    Given that a user directly accesses the base url
    When there is an immediate error
    Then they should see the unrecoverable error page
