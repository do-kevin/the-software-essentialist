import { passwordValidator } from '../../utils/passwordValidator';

const password = '';

describe('Password Validator', () => {
  it("should determine whether the password's length is outside of 5 and 15", () => {
    expect(password.length).toBeGreaterThanOrEqual(5);
    expect(password.length).toBeLessThanOrEqual(15);
  });
});
