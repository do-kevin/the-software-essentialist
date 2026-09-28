Feature: Create Student 

  As an administrator
    I want to be able to create student records
    So that the students can be assigned to classes and managed within the system

  Scenario: Successfully create a student record
    Given I want to create a student named "Kevin"
    When I send a request to create the student
    Then the student record is created successfully.

  Scenario: Fail to create a student 
    Given I want to create a student record that doesn't have a name yet
    When I send a request to create the student
    Then the student record could not be created.