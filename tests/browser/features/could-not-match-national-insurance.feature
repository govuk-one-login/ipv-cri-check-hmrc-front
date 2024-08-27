@mock-api:success @retry @post-merge
Feature: Could not match national insurance
  Retry on the NINO page
  Background:
    Given Happy Harriet is using the system
    And they have started the journey
    And they should see the national insurance number page
    And they enter a national insurance number that requires a retry
    When they continue from national insurance number

  Scenario: Display could not match national insurance number page
    Then they should see the could not match national insurance number page

  Scenario: Validation on could not match national insurance number page
    When they click continue could not match national insurance number
    Then they should see could not match national insurance validation messages

  Scenario: choose to retry entering details on the national insurance number page
    When they choose to retry entering national insurance number
    When they click continue could not match national insurance number
    Then they should see the national insurance number page

  Scenario: Stop answering questions
    When they choose to not retry entering national insurance number
    When they click continue could not match national insurance number
    Then they should be redirected
