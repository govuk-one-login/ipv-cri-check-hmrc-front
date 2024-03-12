@mock-api:access-denied @abandon
Feature: Abandon NINO CRI

  Background:
    Given Happy Harriet is using the system
    And they have started the journey
    And they should see the national insurance number page
    When they click on the abandon link from enter national insurance page
    Then they should see the abandon page

  Scenario: Validation on abandon page
    When they click continue from abandon
    Then they should see abandon validation messages

  Scenario: Choose to return to national insurance number page
    Given they choose to return to national insurance number
    When they click continue from abandon
    Then they should see the national insurance number page

  Scenario: Stop answering questions
    Given they choose to abandon
    When they click continue from abandon
    Then they should be redirected as access denied
