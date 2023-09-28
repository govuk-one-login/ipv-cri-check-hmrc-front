Feature: Happy path

  Successful journey through the system and back to the RP

  @mock-api:success
  Scenario: Happy Path
    Given Happy Harriet is using the system
    And they have started the journey
    And they should see the national insurance number page
    And they enter their national insurance number
    When they continue from national insurance number
    Then they should be redirected as a success
