Feature: Create student

  Scenario: Successfully create a student
    When I send a POST request to "/students" with name "Ada Lovelace"
    Then the response status should be 201
    And the response body should contain a student named "Ada Lovelace"