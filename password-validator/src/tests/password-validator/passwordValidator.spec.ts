import PasswordValidator from '../../utils/passwordValidator';

describe('Password Validator', () => {
  let passwordValidator: PasswordValidator;

  beforeEach(() => {
    passwordValidator = new PasswordValidator();
  });

  it("should determine whether the password's length is outside of 5 and 15", () => {
    const result = passwordValidator.validate('password123');

    expect(result.data.password.length).toBeGreaterThanOrEqual(5);
    expect(result.data.password.length).toBeLessThanOrEqual(15);
  });

  it('should contain error if the password is too short', () => {
    const result = passwordValidator.validate('pass');

    expect(result.errors).toContainEqual({
      code: 'INVALID_LENGTH',
      message: 'The password must be between 5 and 15 characters long.',
    });
  });

  it('should contain error if the password is too long', () => {
    const result = passwordValidator.validate('longpassword1234');

    expect(result.errors).toContainEqual({
      code: 'INVALID_LENGTH',
      message: 'The password must be between 5 and 15 characters long.',
    });
  });
});
