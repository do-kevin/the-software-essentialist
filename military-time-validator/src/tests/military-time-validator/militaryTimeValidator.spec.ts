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

  it("should return false if the '2t:34 - ' is not in a valid military time format", () => {
    const result = militaryTimeValidator.validate('2t:34 - ');

    expect(result).toBeFalsy();
  });

  it('should return false if "22:34 -- " is not in a valid military time format', () => {
    const result = militaryTimeValidator.validate('22:34 -- ');

    expect(result).toBeFalsy();
  });

  it('should return false if "22:3x - " is not in a valid military time format', () => {
    const result = militaryTimeValidator.validate('22:3x - ');

    expect(result).toBeFalsy();
  });

  it("should return false if the ' - ' is not in a valid military time format", () => {
    const result = militaryTimeValidator.validate(' - ');

    expect(result).toBeFalsy();
  });

  it('should return false if "22:3x - 24:10" is not in a valid military time format', () => {
    const result = militaryTimeValidator.validate('22:3x - 24:10');

    expect(result).toBeFalsy();
  });
});
