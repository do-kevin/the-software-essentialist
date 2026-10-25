Feature: Create assignment 

  As a teacher 
    I want to create an assignment
    So that I can assign it to students.
    
  Scenario: Successfully create an assignment
    Given I want to an assignment called "Skip Counting by 2s, 5s, and 10s"
    When I send a request to create the assignment
    Then the assignment should be created successfully.

  Scenario: Fail to create an assignment
    Given I want to create an assignment with no title.
    When I send a request to create an assignment
    Then the assignment should not be created.