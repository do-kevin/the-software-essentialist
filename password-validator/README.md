# Password Validator

## Problem Description

- Between 5 & 15 chars long
- Contains at least 1 digit
- Contains at least one uppercase letter
- Return an object containing a boolean result and an errors key. When it's provided with an invalid password, it should contain an error message or type for all errors in occurence. There can be multiple errors at a single time.

#### Find

What are the responsibilities of a password validator?

- It is to check people's new password and determine if it's a strong password by checking it through its criteria:
- so the password must be at least 5 characters long and must not exceed 15 characters
  - For example: weakpassword
- it should have at least 1 digit in the password
  - For example: weakpassword123
- and finally it should have at least 1 uppercase letter
  - For example: weakPassword123

#### Architect

What could be the shape of the data that gets consumed by the backend and/or frontend ui's form to deny or accept the new password?

Failure

```
{
    valid: false,
    data: null,
    errors: [
        {
            type: "INVALID_LENGTH",
            message: "The password must be between 5 and 15 characters long."
        }
    ],
}
```

Success

```
{
    valid: true,
    data: "weakPassword123",
    errors: [],
}
```

#### Automate

Jest and Typescript scripts are already prepared in this starter template

#### Specify

- `it("it should determine if the password length is out of 5 and 15")`
- `it("it should see if there's at least a digit in the password")`
- `it("it should see if there's at least an uppercase letter in the password")`

#### Test

- Prepare my initial tests using what I've noted down in Architect section and Specify section
- Fake it to make my tests pass. It's like stubbing
- Incrementally create code first with obvious implementation and then litte feature by feature delivery

#### Refine

Refactor code. If it shows up at least 3 times, could be best time to refactor and also make it readable.
