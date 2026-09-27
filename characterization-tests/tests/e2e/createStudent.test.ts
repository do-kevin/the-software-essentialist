import { loadFeature, describeFeature } from "@amiceli/vitest-cucumber";
import { expect } from "vitest";
import request from "supertest";
import { app } from "../../src";

const feature = await loadFeature("tests/features/create-student.feature");

describeFeature(feature, ({ Scenario }) => {
  Scenario(`Successfully create a student record`, ({ Given, When, Then }) => {
    let requestBody: any = {};
    let response: any = {};

    Given(`I want to create a student named {string}`, (_context, name) => {
      requestBody = {
        name,
      };
    });

    When(`I send a request to create the student`, async () => {
      response = await request(app).post("/students").send(requestBody);
    });

    Then(`the student record is created successfully.`, () => {
      expect(response.status).toBe(201);
      expect(response.body.data.name).toBe(requestBody.name);
    });
  });
  Scenario(`Fail to create a student`, ({ Given, When, Then }) => {
    Given(
      `I want to create a student record that doesn't have a name yet`,
      () => {}
    );
    When(`I send a request to create the student`, () => {});
    Then(`the student record could not be created.`, () => {});
  });
});
