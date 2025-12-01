@retry @post-merge @quality_gate_integration_test @quality_gate_regression_test @quality_gate_stack_test
Feature: Could not match national insurance
  Retry on the NINO page
  Background:
    Given that "Happy Harriet" user is going through the system
    And they have started the journey
    And they should see the national insurance number page
    And they enter a national insurance number that requires a retry
    When they continue from national insurance number

  @mock-api:success
  Scenario: Display could not match national insurance number page
    Then they should see the could not match national insurance number page

  @mock-api:success
  Scenario: Validation on could not match national insurance number page
    When they click continue could not match national insurance number
    Then they should see could not match national insurance validation messages

  @mock-api:success
  Scenario: choose to retry entering details on the national insurance number page
    When they choose to retry entering national insurance number
    When they click continue could not match national insurance number
    Then they should see the national insurance number page

  @mock-api:access-denied
  Scenario: Stop answering questions
    When they choose to not retry entering national insurance number
    When they click continue could not match national insurance number
    Then they should be redirected to access_denied
