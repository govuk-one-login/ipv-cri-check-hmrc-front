Feature: Error handling
  Nino Errors in the middle of the journey

  @mock-api:success
  Scenario: Error Bad Nino
    Given that "Happy Harriet" user is going through the system
    And they have started the journey
    And they should see the national insurance number page
    And they enter a bad national insurance number
    When they continue from national insurance number
    Then they should see the validation error page
