import PasswordValidator from '../../utils/passwordValidator';

describe('Password Validator', () => {
  let passwordValidator: PasswordValidator;

  beforeEach(() => {
    passwordValidator = new PasswordValidator();
  });

  it("should determine whether the password's length is outside of 5 and 15", () => {
    const result = passwordValidator.validate();

    expect(result.data.password.length).toBeGreaterThanOrEqual(5);
    expect(result.data.password.length).toBeLessThanOrEqual(15);
  });
});
