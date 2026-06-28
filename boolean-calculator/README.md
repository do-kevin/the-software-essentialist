# Boolean Calculator

## Problem Description

We want to be able to take in a boolean expression as a string and compute the correct boolean result.

#### Find

What are the responsibilities of a boolean calculator?

- Takes in a string that is a boolean expression
- Outputs the correct boolean result.

#### Architect

Input will be a string. That string is a boolean expression. The result returned will be a boolean.
We should not use new Function() because that is a security risk. User can enter malicious code.

#### Automate

Jest and Typescript scripts are already prepared in this starter template

#### Specify

- `it("should determine that 'TRUE OR TRUE OR TRUE AND FALSE' is true.")`
- `it("should determine that 'TRUE OR FALSE AND NOT FALSE' is true.")`
- `it("should determine that '(TRUE OR TRUE OR TRUE) AND FALSE' is false.")`
- `it("should determine that 'NOT (TRUE AND TRUE)' is false.")`

#### Test

- Prepare my initial tests using what I've noted down in Architect section and Specify section
- Fake it to make my tests pass. It's like stubbing
- Incrementally create code first with obvious implementation and then litte feature by feature delivery
- Because it takes in a string, we need to add further checks on formatting of string.

#### Refine

Refactor code. If it shows up at least 3 times, could be best time to refactor and also make it readable.
