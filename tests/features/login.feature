Feature: Verify login screen

  @login
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