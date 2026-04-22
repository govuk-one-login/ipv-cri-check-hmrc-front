Feature: Error handling

  API Errors in middle of journey

  Scenario: Error - Page not found
    Given that "Error Eric" user is going through the system
    And they have started the journey
    When they go to an unknown page
    Then they should see the Page not found error page
