import { describeFeature, loadFeature } from "@amiceli/vitest-cucumber";
import request from "supertest";
import { expect } from "vitest";
import { app } from "../src";

const feature = await loadFeature("features/create-student.feature");

describeFeature(feature, ({ Scenario }) => {
  Scenario("Successfully create a student", ({ When, Then, And }) => {
    let response: request.Response;

    When(
      'I send a POST request to "/students" with name "Ada Lovelace"',
      async () => {
        response = await request(app)
          .post("/students")
          .send({ name: "Ada Lovelace" });
      }
    );

    Then("the response status should be 201", () => {
      expect(response.status).toBe(201);
    });

    And(
      'the response body should contain a student named "Ada Lovelace"',
      () => {
        expect(response.body).toMatchObject({
          success: true,
          data: { name: "Ada Lovelace" },
        });
      }
    );
  });
});
