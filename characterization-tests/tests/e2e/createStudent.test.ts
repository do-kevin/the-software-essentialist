import { loadFeature, describeFeature } from "@amiceli/vitest-cucumber"

const feature = await loadFeature('tests/features/create-student.feature')

describeFeature(feature, ({ BeforeAllScenarios, AfterAllScenarios, BeforeEachScenario, AfterEachScenario, Scenario }) => {
  BeforeAllScenarios(() => {})
  AfterAllScenarios(() => {})
  BeforeEachScenario(() => {})
  AfterEachScenario(() => {})

  Scenario(`Successfully create a student record`, ({ Given, When, Then }) => {
      Given(`I want to create a student named "Kevin"`, () => { })
      When(`I send a request to create the student`, () => { })
      Then(`the student record is created successfully.`, () => { })
  })
  Scenario(`Fail to create a student`, ({ Given, When, Then }) => {
      Given(`I want to create a student record that doesn't have a name yet`, () => { })
      When(`I send a request to create the student`, () => { })
      Then(`the student record could not be created.`, () => { })
  })

})