import { loadFeature, describeFeature } from "@amiceli/vitest-cucumber";
// import { app } from "../../src";
// import { faker } from "@faker-js/faker";
// import request from "supertest"
import { resetDatabase } from "../fixtures/reset";
import { expect } from "vitest";

const feature = await loadFeature("tests/features/create-assignment.feature");

describeFeature(feature, ({ BeforeEachScenario, Scenario }) => {
  BeforeEachScenario(async () => {
    await resetDatabase();
  });

  Scenario(`Successfully create an assignment`, ({ Given, When, Then }) => {
    Given(
      `I want to an assignment called "Skip Counting by 2s, 5s, and 10s"`,
      () => {}
    );
    When(`I send a request to create the assignment`, () => {});
    Then(`the assignment should be created successfully.`, () => {
      expect(response.status).toBe(201);
      expect(response.body.data.title).toBe("Skip Counting by 2s, 5s, and 10s");
    });
  });

  Scenario(`Fail to create an assignment`, ({ Given, When, Then }) => {
    Given(`I want to create an assignment with no title.`, () => {});
    When(`I send a request to create an assignment`, () => {});
    Then(`the assignment should not be created.`, () => {
      expect(response.status).toBe(400);
    });
  });
});
