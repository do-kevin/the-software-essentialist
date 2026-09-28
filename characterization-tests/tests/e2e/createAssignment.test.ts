import { loadFeature, describeFeature } from "@amiceli/vitest-cucumber";
import { app } from "../../src";
import { faker } from "@faker-js/faker";
import request, { type Response } from "supertest";
import { resetDatabase } from "../fixtures/reset";
import { expect } from "vitest";
import { Assignment, Class } from "@prisma/client";
import { ClassroomBuilder } from "../fixtures/builders/classroomBuilder";

const feature = await loadFeature("tests/features/create-assignment.feature");

describeFeature(feature, ({ BeforeEachScenario, Scenario }) => {
  BeforeEachScenario(async () => {
    await resetDatabase();
  });

  Scenario(`Successfully create an assignment`, ({ Given, When, Then }) => {
    let requestBody: Partial<Pick<Assignment, "classId" | "title">> = {};
    let response: any = {};
    let classRoom: Class;

    Given(
      `I want to an assignment called "Skip Counting by 2s, 5s, and 10s"`,
      async () => {
        classRoom = await new ClassroomBuilder().withName("Math").build();

        requestBody = {
          classId: classRoom.id,
          title: "Skip Counting by 2s, 5s, and 10s",
        };
      }
    );

    When(`I send a request to create the assignment`, async () => {
      response = await request(app).post("/assignments").send(requestBody);
    });

    Then(`the assignment should be created successfully.`, () => {
      expect(response.status).toBe(201);
      expect(response.body.data.classId.length).toBeGreaterThan(0);
      expect(response.body.data.title).toBe("Skip Counting by 2s, 5s, and 10s");
    });
  });

  Scenario(`Fail to create an assignment`, ({ Given, When, Then }) => {
    let requestBody: Partial<Pick<Assignment, "classId" | "title">> = {};
    let response: any = {};
    let classRoom: Class;

    Given(`I want to create an assignment with no title.`, async () => {
      classRoom = await new ClassroomBuilder().withName("Math").build();

      requestBody = {
        classId: classRoom.id,
        title: undefined,
      };
    });

    When(`I send a request to create an assignment`, async () => {
      response = await request(app).post("/assignments").send(requestBody);
    });

    Then(`the assignment should not be created.`, () => {
      expect(response.status).toBe(400);
    });
  });
});
