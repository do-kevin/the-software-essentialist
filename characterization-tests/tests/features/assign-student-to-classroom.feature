Feature: Assign Student to Classroom 

  As an administrator 
    I want to assign a student to a classroom
    So that the student have access to teacher and assignments.
    
  Scenario: Successfully assign a student to a class room
    Given there is an existing student and classroom
    When I send a request to assign the student to it
    Then it should enroll that student into the classroom.
