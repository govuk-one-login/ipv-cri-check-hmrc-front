Feature: Happy path

  Successful journey through the system and back to the RP

  @mock-api:success
  Scenario: Happy Path
    Given Happy Harriet is using the system
    When they have started the journey
    Then they should see the national insurance number page
    And they continue from national insurance number
    Then they should be redirected as a success
