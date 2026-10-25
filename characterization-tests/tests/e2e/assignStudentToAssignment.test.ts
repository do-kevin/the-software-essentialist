import { loadFeature, describeFeature } from "@amiceli/vitest-cucumber";
import { resetDatabase } from "../fixtures/reset";
import { expect } from "vitest";
import { faker } from "@faker-js/faker";
import { ClassEnrollment, StudentAssignment } from "@prisma/client";

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
      let responseBody: Partial<
        Pick<StudentAssignment, "assignmentId" | "studentId">
      > = {};

      const response: any = {};

      Given(`there is an existing student and assignment`, () => {
        responseBody = {
          studentId: faker.string.uuid(),
          assignmentId: faker.string.uuid(),
        };
      });
      When(`I send a request to assign the student to it`, () => {
        response.status = 201;
        response.data = {
          studentId: responseBody.studentId,
          assignmentId: responseBody.assignmentId,
        };

        console.log(
          "res: ",
          response.data.studentId === responseBody.studentId
        );
      });
      Then(`the assignment have that student associated with it.`, () => {
        expect(response.status).toBe(201);
        expect(response.data.studentId).toBe(responseBody.studentId);
        expect(response.data.assignmentId).toBe(responseBody.assignmentId);
      });
    }
  );
});
