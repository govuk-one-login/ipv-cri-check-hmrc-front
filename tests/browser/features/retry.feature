Feature: Retry

  Retry on the NINO page

  @mock-api:success @retry
  Scenario: Retry
    Given Happy Harriet is using the system
    And they have started the journey
    And they should see the national insurance number page
    And they enter a national insurance number that requires a retry
    When they continue from national insurance number
    Then they should see the national insurance number page
    And they should see the national insurance number not found error box
