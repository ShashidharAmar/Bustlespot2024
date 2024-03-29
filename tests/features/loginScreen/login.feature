Feature: Verify login screen

  @loginScreen
  Scenario Outline: Login to the application
    Given user in login screen
    # When user enter the email and password
    When user enter the "<email>" and "<password>"
    Then Verify popup "<message>"

    Examples: 
      | email                                 | password    | message                        |
      | shashidhar.amarannavar@softsuave.org  | Shashi#123  | Successfully logged in.        |
      | shashidhar.amarannavar@softsuave.org  | Shashi#1231 | Wrong password entered.        |
      | shashidhar.amarannavar1@softsuave.org | Shashi#123  | No user found. Please sign up. |
      | shashidhar.amarannavar1@softsuave.org | Shashi#1231 | No user found. Please sign up. |

  @login @validationEmailAndPassword
  Scenario Outline: Verify the email and password textbox validation message.
    Given user in login screen
    When user enter the wrong "<email>" and "<password>"
    Then Verify the email and password "<validation message>"

    Examples: 
      | email                  | password  | validation message                 |
      | shashidhar.amarannavar |           | Please enter a valid email address |
      |                        | Shashi#12 | Please enter your password         |
      |                        |           | Please enter your email            |

  @regressionTest
  Scenario Outline: Login to the application
    Given user in login screen
    When user enter the email and password
    Then Verify popup "Successfully logged in."
