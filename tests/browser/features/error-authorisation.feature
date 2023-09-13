Feature: Error handling

  API Errors in the middle of the journey

  @mock-api:authorization-error
  Scenario: Session error
    Given Error Eric is using the system
    And they have started the journey
    Then they should see the national insurance number page
    And they continue from national insurance number
    Then they should be redirected as an error with a description "gateway"
