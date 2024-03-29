Feature: Verifying forgot password in login screen

  @loginScreen
  Scenario Outline: Enter the wrong email and verify validation message
    Given user in login screen
    When user click on the forgot password and enter "<incorrect email>"
    Then Verify the email textfield "<validation message>"

    Examples: 
      | incorrect email        | validation message                 |
      | shashidhar.amarannavar | Please enter a valid email address |

  @loginScreen
  Scenario Outline: Enter the unknown user email and verify the popup
    Given user in login screen
    When user click on the forgot password and enter "<unknown email>"
    When click on reset password
    Then Verify popup "<message>"

    Examples: 
      | unknown email         | message           |
      | unknownMail@gmail.com | No User was found |
