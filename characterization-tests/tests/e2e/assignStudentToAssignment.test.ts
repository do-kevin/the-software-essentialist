import { loadFeature, describeFeature } from "@amiceli/vitest-cucumber";
import { resetDatabase } from "../fixtures/reset";
import { expect } from "vitest";
import { response } from "express";

const feature = await loadFeature(
  "tests/features/assign-student-to-assignment.feature"
);

describeFeature(feature, ({ BeforeEachScenario, Scenario }) => {
  BeforeEachScenario(async () => {
    await resetDatabase();
  });

  Scenario(
    `Successfully assign a student to assignment`,
    ({ Given, When, Then }) => {
      Given(`there is an existing student and assignment`, () => {});
      When(`I send a request to assign the student to it`, () => {});
      Then(`the assignment have that student associated with it.`, () => {
        expect(response.status).toBe(201);
        expect(response.data.studentId).toBe(requestBody.data.studentId);
        expect(response.data.assignmentId).toBe(requestBody.data.assignmentId);
      });
    }
  );
});
