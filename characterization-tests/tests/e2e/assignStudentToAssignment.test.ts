import { loadFeature, describeFeature } from "@amiceli/vitest-cucumber";
import { resetDatabase } from "../fixtures/reset";
import request from "supertest";
import { expect } from "vitest";
import { app } from "../../src/index";
import { StudentAssignment } from "@prisma/client";
import { EnrolledStudentBuilder } from "../fixtures/builders/enrolledStudentBuilder";
import { ClassroomBuilder } from "../fixtures/builders/classroomBuilder";
import { StudentBuilder } from "../fixtures/builders/studentBuilder";
import { AssignmentBuilder } from "../fixtures/builders/assignmentBuilder";

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
      let requestBody: Partial<
        Pick<StudentAssignment, "assignmentId" | "studentId">
      > = {};

      let response: any = {};

      Given(`there is an existing student and assignment`, async () => {
        const classBuilder = new ClassroomBuilder().withName("Math");
        const studentBuilder = new StudentBuilder().withName("Tom");

        const enrolledStudent = await new EnrolledStudentBuilder()
          .from(classBuilder)
          .and(studentBuilder)
          .build();

        const assignment = await new AssignmentBuilder()
          .withClassId(enrolledStudent.classId)
          .withTitle("Algebra")
          .build();

        requestBody = {
          studentId: enrolledStudent.studentId,
          assignmentId: assignment.id,
        };
      });

      When(`I send a request to assign the student to it`, async () => {
        response = await request(app)
          .post("/student-assignments")
          .send(requestBody);
      });

      Then(`the assignment have that student associated with it.`, () => {
        expect(response.status).toBe(201);
        expect(response.body.data.studentId).toBe(requestBody.studentId);
        expect(response.body.data.assignmentId).toBe(requestBody.assignmentId);
      });
    }
  );
});
