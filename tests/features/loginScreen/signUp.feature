Feature: Verify the signUp page.

  @loginScreen @signUp
  Scenario Outline: Create account and verify the toast message
    Given user in login screen
    When user in lagin page and click on signUp
    And fill all details with "<emailId>" and "<password>"
    And click on signUp button
    Then Verify popup "<created>"
    When navigate to back
    And fill all details with "<emailId>" and "<password>"
    And click on signUp button
    Then Verify popup "<exists>"

    Examples: 
      | emailId    | password | created                                                     | exists                              |
      | @gmail.com | #123     | User has been created successfully.Please verify the email. | User already exists please sign in. |

#   @loginScreen @signUp
#   Scenario Outline: Entering null values to the textbox and verify error message
#     Given user in login screen
#     When user in lagin page and click on signUp
#     And enter "<emailId>","<firstName>","<lastName>","<password>", and "<confirmPassword>"
#     Then enter blank values in all textbox and verify the error message

#     Examples: 
#       | emailId    | firstName         | lastName          | password   | confirmPassword |
#       | abc@gmail. | sixteenCharrector | MaximumCharrector | Shashi#123 | Shashi#12       |

#   @loginScreen @signUp
#   Scenario Outline: Entering invalid values to the textbox and verify error message
#     Given user in login screen
#     When user in lagin page and click on signUp
#     And enter "<emailId>","<firstName>","<lastName>","<password>", and "<confirmPassword>"
#     Then enter invalid values in all textbox and verify the error message

#     Examples: 
#       | emailId    | firstName          | lastName           | password | confirmPassword |
#       | abc@gmail. | sixteenCharrectors | MaximumCharrectors | Shashi   | Shashi#1234     |