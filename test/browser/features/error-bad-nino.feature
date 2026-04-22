Feature: Error handling
  Nino Errors in the middle of the journey

  @mock-api:success
  Scenario Outline: Error Bad Nino for invalid nino regex
    Given that "Happy Harriet" user is going through the system
    And they have started the journey
    And they should see the national insurance number page
    And they enter a "<invalidNino>" national insurance number value
    When they continue from national insurance number
    Then they should see the "nino" validation error page

    Examples:
      | invalidNino          |
      | A                    |
      | ABCDEFGHIJ           |
      | 123456789            |
      | ABCD12345D           |
      | 12345ABCDEFGHIJKLMNO |
      | PE12JGB31DE          |

  Scenario Outline: Error Bad Nino for invalid character regex
    Given that "Happy Harriet" user is going through the system
    And they have started the journey
    And they should see the national insurance number page
    And they enter a "<invalidCharacter>" national insurance number
    When they continue from national insurance number
    Then they should see the "invalidLetter" validation error page

    Examples:
      | invalidCharacter |
      | TN123456V        |
      | TN123456A        |
      | AA123456X        |
      | PO123456A        |
      | GB123456C        |
      | VA123456A        |
