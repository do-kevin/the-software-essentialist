import { loadFeature, describeFeature } from "@amiceli/vitest-cucumber";
import request from "supertest";
import { expect } from "vitest";
import { app } from "../../src/index";
import { faker } from "@faker-js/faker";
import { resetDatabase } from "../fixtures/reset";
import { Class } from "@prisma/client";
import { ClassroomBuilder } from "../fixtures/builders/classroomBuilder";

const feature = await loadFeature("tests/features/create-classroom.feature");

describeFeature(feature, ({ Scenario, BeforeEachScenario }) => {
  BeforeEachScenario(async () => {
    await resetDatabase();
  });

  Scenario(`Successfully create a class room`, ({ Given, When, Then }) => {
    let requestBody: any = {};
    let response: any = {};

    Given(`I want to create a class room named {string}`, (_context, _name) => {
      const uniqueName = faker.lorem.word() + faker.string.uuid();

      requestBody = {
        name: uniqueName,
      };
    });
    When(`I send a request to create a class room`, async () => {
      response = await request(app).post("/classes").send(requestBody);
    });

    Then(`the class room should be created successfully.`, () => {
      expect(response.status).toBe(201);
      expect(response.body.data.name).toBe(requestBody.name);
    });
  });

  Scenario(`Fail to create a class room`, ({ Given, When, Then }) => {
    let requestBody: any = {};
    let response: any = {};

    Given(`I want to create a class room named with no name.`, () => {
      requestBody = {
        name: undefined,
      };
    });

    When(`I send a request to create a class room`, async () => {
      response = await request(app).post("/classes").send(requestBody);
    });

    Then(`the class room not should be created.`, () => {
      expect(response.status).toBe(400);
    });
  });

  Scenario(`Classroom already exists`, ({ Given, When, Then }) => {
    let requestBody: Partial<Pick<Class, "name">> = {};
    let response: any = {};
    const classRoomName = "Science";

    Given(`I want to create a class room that already exists`, async () => {
      requestBody = {
        name: classRoomName,
      };

      await new ClassroomBuilder().withName(classRoomName).build();
    });

    When(`I send a request to create a class room`, async () => {
      response = await request(app).post("/classes").send(requestBody);
    });

    Then(`the class room should not be created.`, () => {
      expect(response.status).toBe(409);
      expect(response.body.success).toBeFalsy();
      expect(response.body.error).toBe("ClassAlreadyExists");
    });
  });
});
