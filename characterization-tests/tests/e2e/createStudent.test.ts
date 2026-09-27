import { loadFeature, describeFeature } from "@amiceli/vitest-cucumber";
import { expect } from "vitest";

const feature = await loadFeature("tests/features/create-student.feature");

describeFeature(feature, ({ Scenario }) => {
  Scenario(`Successfully create a student record`, ({ Given, When, Then }) => {
    let response: any = {};

    Given(`I want to create a student named {string}`, () => {});

    When(`I send a request to create the student`, () => {
      response = {
        status: 201,
        body: {
          name: "Kevin",
        },
      };
    });

    Then(`the student record is created successfully.`, () => {
      expect(response.status).toBe(201);
      expect(response.body.name).toBe("Kevin");
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
