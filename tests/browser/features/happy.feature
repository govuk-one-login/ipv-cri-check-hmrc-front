Feature: Happy path

  Successful journey through the system and back to the RP

  @mock-api:success @happy @post-merge
  Scenario: Happy Path
    Given that "Happy Harriet" user is going through the system
    And they have started the journey
    And they should see the national insurance number page
    And they enter their national insurance number
    When they continue from national insurance number
    Then they should be redirected as a success

  @mock-api:success @happy @post-merge
  Scenario: Happy Path with multiple names
    Given that "Multiple Names" user is going through the system
    And they have started the journey
    And they should see the national insurance number page
    And they enter their national insurance number
    When they continue from national insurance number
    Then they should be redirected as a success

  @mock-api:success @device-intelligence @post-merge
  Scenario: Happy path with di-device-intelligence cookie
    Given that "Happy Harriet" user is going through the system
    And they have started the journey
    And they should see the national insurance number page
    # The device intelligence cookie is set in client-side JS. If we check the cookies immediately after loading the first page the cookie won't be present, so we navigate to the next page before testing to ensure that Playwright picks up the cookie
    And they enter their national insurance number
    Then the di-device-intelligence cookie has been set
