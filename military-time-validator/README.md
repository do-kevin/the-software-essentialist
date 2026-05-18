# Military Time Validator

## Problem Description

Determine if the provided string time range is a valid military time range or not.

- "01:12 - 14:32" (yes)
- "25:00 - 12:23" (no)
- "22:00 - 23:12" (yes)

#### Find

What are the responsibilities of a military time validator?

- Reduces ambiguity between a.m. and p.m.; reduces misunderstandings that can be dangerous
- Makes sure the app or systems display the correct time for planned events such as scheduled surgeries. It solves logistic issues.
- Therefore, it must ensure that the start time and end time are in a valid military time format.

#### Architect

What could be the shape of the data that gets consumed by the backend and/or frontend ui's form to report whether or not the given time range is valid? Consult the Transformation Priority Premise (TPP).

TO-DO: Provide explanation.

#### Automate

Jest and Typescript scripts are already prepared in this starter template

#### Specify

- `it("it should determine that "01:12 - 14:32" is a valid time range in military)`
- `it("it should determine that "25:00 - 12:23" is not a valid time range in military time)`
- `it("it should determine that "22:00 - 23:12" is a valid time range in military)`

#### Test

TO-DO: Rewrite this section due to TTP.

- Prepare my initial tests using what I've noted down in Architect section and Specify section
- Fake it to make my tests pass. It's like stubbing
- Incrementally create code first with obvious implementation and then litte feature by feature delivery

#### Refine

Refactor code. If it shows up at least 3 times, could be best time to refactor and also make it readable.
