Feature: Assign Student to Assignment 

  As a teacher 
    I want to assign a student to an assignment 
    So that the student can achieve learning objectives.
    
  Scenario: Successfully assign a student to assignment
    Given there is an existing student and assignment
    When I send a request to assign the student to it
    Then the assignment have that student associated with it.
