Feature: Error handling

  API Errors in the middle of the journey

  @mock-api:authorization-error
  Scenario: Session error
    Given that "Error Eric" user is going through the system
    And they have started the journey
    And they should see the national insurance number page
    And they enter their national insurance number
    When they continue from national insurance number
    Then they should be redirected as an error with a description "gateway"
