import { loadFeature, describeFeature } from "@amiceli/vitest-cucumber";
import { resetDatabase } from "../fixtures/reset";
import { expect } from "vitest";
import { ClassEnrollment } from "@prisma/client";
import { faker } from "@faker-js/faker";

const feature = await loadFeature(
  "tests/features/assign-student-to-classroom.feature"
);

describeFeature(feature, ({ BeforeEachScenario, Scenario }) => {
  BeforeEachScenario(async () => {
    await resetDatabase();
  });

  Scenario(
    `Successfully assign a student to a class room`,
    ({ Given, When, Then }) => {
      let requestBody: Partial<Pick<ClassEnrollment, "classId" | "studentId">> =
        {};
      let response: any = {};

      Given(`there is an existing student and classroom`, () => {
        requestBody = {
          studentId: faker.string.uuid(),
          classId: faker.string.uuid(),
        };
      });
      When(`I send a request to assign the student to it`, () => {
        response = {
          status: 201,
          body: {
            studentId: requestBody.studentId,
            classId: requestBody.classId,
          },
        };
      });
      Then(`it should enroll that student into the classroom.`, () => {
        expect(response.status).toBe(201);
        expect(response.body.studentId).toBe(requestBody.studentId);
        expect(response.body.classId).toBe(requestBody.classId);
      });
    }
  );
});
