Feature: Create classroom

  As an administrator
    I want to create a classroom
    So that I can add students to it

  Scenario: Successfully create a class room 
    Given I want to create a class room named "Math"
    When I send a request to create a class room
    Then the class room should be created successfully.

  Scenario: Fail to create a class room 
    Given I want to create a class room named with no name.
    When I send a request to create a class room
    Then the class room not should be created.