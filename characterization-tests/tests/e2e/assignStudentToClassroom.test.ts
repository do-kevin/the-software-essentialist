import { loadFeature, describeFeature } from "@amiceli/vitest-cucumber";
import { resetDatabase } from "../fixtures/reset";
import request from "supertest";
import { expect } from "vitest";
import { app } from "../../src/index";
import { ClassEnrollment } from "@prisma/client";
import { EnrolledStudentBuilder } from "../fixtures/builders/enrolledStudentBuilder";
import { ClassroomBuilder } from "../fixtures/builders/classroomBuilder";
import { StudentBuilder } from "../fixtures/builders/studentBuilder";

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

      Given(`there is an existing student and classroom`, async () => {
        const classroom = await new ClassroomBuilder()
          .withName("AI Bootcamp")
          .build();
        const student = await new StudentBuilder().withName("Tom Doe").build();

        requestBody = {
          classId: classroom.id,
          studentId: student.id,
        };
      });
      When(`I send a request to assign the student to it`, async () => {
        response = await request(app)
          .post("/class-enrollments")
          .send(requestBody);
      });
      Then(`it should enroll that student into the classroom.`, async () => {
        expect(response.status).toBe(201);
        expect(response.body.data.classId).toBe(requestBody.classId);
        expect(response.body.data.studentId).toBe(requestBody.studentId);
      });
    }
  );
});
