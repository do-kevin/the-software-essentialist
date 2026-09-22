import { loadFeature, describeFeature } from "@amiceli/vitest-cucumber";
import request from "supertest";
import { expect } from "vitest";
import { app } from "../../src/index";

const feature = await loadFeature("tests/features/create-classroom.feature");

describeFeature(feature, ({ Scenario }) => {
  Scenario(`Successfully create a class room`, ({ Given, When, Then }) => {
    let requestBody: any = {};
    let response: any = {};

    Given(`I want to create a class room named {string}`, (_context, name) => {
      requestBody = {
        name,
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
      console.log("hit: ", response.status);
      expect(response.status).toBe(400);
    });
  });
});
