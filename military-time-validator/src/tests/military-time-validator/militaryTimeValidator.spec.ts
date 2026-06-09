import MilitaryTimeValidator from '../../utils/militaryTimeValidator';

describe('Password Validator', () => {
  let militaryTimeValidator: MilitaryTimeValidator;

  beforeEach(() => {
    militaryTimeValidator = new MilitaryTimeValidator();
  });

  it('should return false if the input is empty', () => {
    const result = militaryTimeValidator.validate('');

    expect(result).toBeFalsy();
  });

  it('should return false if the input is not in a valid military time format', () => {
    const result = militaryTimeValidator.validate('22:34 - ');

    expect(result).toBeFalsy();
  });
});
