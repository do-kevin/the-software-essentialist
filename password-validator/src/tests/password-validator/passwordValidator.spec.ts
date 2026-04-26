import PasswordValidator from '../../utils/passwordValidator';

describe('Password Validator', () => {
  let passwordValidator: PasswordValidator;

  beforeEach(() => {
    passwordValidator = new PasswordValidator();
  });

  it('should contain error because the password "arch" is not at least 5 characters long', () => {
    const result = passwordValidator.validate('pass');

    expect(result.errors).toContainEqual({
      code: 'INVALID_LENGTH',
      message: 'The password must be between 5 and 15 characters long.',
    });
  });

  it("should determine the password's length is within range", () => {
    const result = passwordValidator.validate('password123');

    expect(result.errors).not.toContainEqual({
      code: 'INVALID_LENGTH',
      message: 'The password must be between 5 and 15 characters long.',
    });
  });

  it("should contain error because the password 'thePhysical1234567' exceeds 15 characters", () => {
    const result = passwordValidator.validate('thePhysical1234567');

    expect(result.errors).toContainEqual({
      code: 'INVALID_LENGTH',
      message: 'The password must be between 5 and 15 characters long.',
    });
  });

  it('should contain error because the password "maxwell1_c" has no uppercase character', () => {
    const result = passwordValidator.validate('maxwell1_c');

    expect(result.errors).toContainEqual({
      code: 'NO_UPPERCASE',
      message: 'The password must have at least 1 uppercased letter.',
    });
  });

  it('the password "maxwell1_C" should not cause an uppercase error', () => {
    const result = passwordValidator.validate('maxwell1_C');

    expect(result.errors).not.toContainEqual({
      code: 'NO_UPPERCASE',
      message: 'The password must have at least 1 uppercased letter.',
    });
  });
});
